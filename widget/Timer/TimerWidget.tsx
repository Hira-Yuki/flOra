'use client';
import SmallStartTimer from '@components/icons/SmallStartTimer';
import SmallStopTimer from '@components/icons/SmallStopTimer';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { useToggle } from '@hooks';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';

import TimerAccordion from './TimerAccordion';

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
      <div className="flex flex-col justify-center items-center py-2 gap-2">
        <div className="text-4xl text-center font-bold">
          {time.format('HH:mm:ss')}
        </div>
        <TimerAccordion />
        <div className="flex pb-4 gap-4">
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
