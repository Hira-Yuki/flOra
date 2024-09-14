'use client';
import SmallStartTimer from '@components/icons/SmallStartTimer';
import SmallStopTimer from '@components/icons/SmallStopTimer';
import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import { useToggle } from '@hooks';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';

const TimerAccordion = () => {
  const [activeTab, setActiveTab] = useState('study'); // 현재 활성화된 탭 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 아코디언 메뉴 열기/닫기 상태

  // 각 탭에 대한 콘텐츠 데이터
  const menuData = {
    study: [
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
      'example-todolist - Study-Routine',
    ],
    studyNonRoutine: [
      'example-todolist - Non-Study',
      'example-todolist - Non-Study',
    ],
    life: [
      'example-todolist - Life-Routine',
      'example-todolist - Life-Routine',
    ],
    lifeNonRoutine: [
      'example-todolist - Non-Life',
      'example-todolist - Non-Life',
    ],
  };

  // 메뉴 클릭 핸들러
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-black font-semibold cursor-pointer"
        >
          example - math 1
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-floraGreen rounded-md shadow-lg p-4 z-10 font-medium max-w-72">
          <div className="flex h-11 space-x-2 overflow-x-auto w-full">
            <button
              onClick={() => handleTabClick('study')}
              className={`px-3 py-0.5 whitespace-nowrap rounded-full ${activeTab === 'study' ? 'bg-floraYellow border border-floraYellow' : 'bg-transparent border border-white text-white'}`}
            >
              스터디 루틴
            </button>
            <button
              onClick={() => handleTabClick('studyNonRoutine')}
              className={`px-3 py-0.5 whitespace-nowrap rounded-full ${activeTab === 'studyNonRoutine' ? 'bg-floraYellow border border-floraYellow' : 'bg-transparent border border-white text-white'}`}
            >
              스터디 비루틴
            </button>
            <button
              onClick={() => handleTabClick('life')}
              className={`px-3 py-0.5 whitespace-nowrap rounded-full ${activeTab === 'life' ? 'bg-floraYellow border border-floraYellow' : 'bg-transparent border border-white text-white'}`}
            >
              라이프 루틴
            </button>
            <button
              onClick={() => handleTabClick('lifeNonRoutine')}
              className={`px-3 py-0.5 whitespace-nowrap rounded-full ${activeTab === 'lifeNonRoutine' ? 'bg-floraYellow border border-floraYellow' : 'bg-transparent border border-white text-white'}`}
            >
              라이프 루틴
            </button>
          </div>
          <div className="overflow-y-auto max-h-40 text-white">
            {menuData[activeTab].map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer py-1"
              >
                <input type="radio" name="routine" className="cursor-pointer" />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function TimerWidget() {
  const [time, setTime] = useState<Dayjs>(dayjs().startOf('day')); // 타이머 시간을 관리하는 상태
  const isActive = useToggle(false); // 타이머 활성화 여부를 저장하는 상태
  const startTimeRef = useRef<Dayjs | null>(null); // 타이머 시작 시간을 저장
  const elapsedTimeRef = useRef<number>(0); // 누적된 경과 시간을 밀리초로 저장

  // 타이머 시작/멈춤 토글 핸들러
  const handleStartStop = () => {
    if (isActive.value) {
      // 타이머 멈출 때 경과 시간을 업데이트
      elapsedTimeRef.current += dayjs().diff(startTimeRef.current);

      isActive.toggleValue();
    } else {
      // 타이머 시작
      startTimeRef.current = dayjs();
      isActive.toggleValue();
    }
  };

  // 정확한 시간을 계산하고 업데이트
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive.value) {
      interval = setInterval(() => {
        const now = dayjs();
        const elapsed =
          now.diff(startTimeRef.current ?? now) + elapsedTimeRef.current;
        setTime(dayjs().startOf('day').add(elapsed, 'millisecond')); // 경과된 시간 반영
      }, 1000); // 1초마다 업데이트
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive.value]);

  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <WidgetHeader title={'타이머'} />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-4">{time.format('HH:mm:ss')}</div>
        <TimerAccordion />
        <div className="flex gap-2">
          <div
            className="cursor-pointer hover:opacity-60"
            onClick={handleStartStop}
          >
            {isActive.value ? <SmallStopTimer /> : <SmallStartTimer />}
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}
