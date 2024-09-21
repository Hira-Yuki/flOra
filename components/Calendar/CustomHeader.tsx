import { ArrowLeft, ArrowRight } from '@components/icons';
import { RefObject } from '@fullcalendar/core/preact';
import FullCalendar from '@fullcalendar/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import SwitchButton from './SwitchButton';

export default function CustomHeader({
  calendarRef,
}: {
  calendarRef: RefObject<FullCalendar>;
}) {
  const [isSwitch, setIsSwitch] = useState(true);
  const [title, setTitle] = useState<string>('');
  const [calendarAPI, setCalendarAPI] = useState(null);

  const handlePrev = () => calendarAPI.prev(); // 이전 달로 이동
  const handleNext = () => calendarAPI.next(); // 다음 달로 이동
  const handleToday = () => calendarAPI.today(); // 오늘 날짜로 이동

  const handleViewChange = (view: 'dayGridMonth' | 'timeGridWeek') => {
    calendarAPI.changeView(view); // 뷰 변경
    setIsSwitch(() => {
      return view === 'dayGridMonth';
    });
  };

  // 달력 API 및 타이틀 설정
  useEffect(() => {
    const calApi = calendarRef.current?.getApi();

    if (calApi) {
      setCalendarAPI(calApi);
      setTitle(dayjs(calApi.getDate()).format('MMM YYYY').toUpperCase());
    }
  }, [calendarRef]);

  // 날짜 변경 시 타이틀 업데이트
  useEffect(() => {
    if (calendarAPI) {
      const updateTitle = () => {
        const newTitle = dayjs(calendarAPI.getDate())
          .format('MMM YYYY')
          .toUpperCase();
        setTitle(newTitle);
      };

      // 날짜 변경 이벤트에 리스너 추가
      calendarAPI.on('datesSet', updateTitle);

      return () => {
        // 컴포넌트가 언마운트될 때 리스너 제거
        calendarAPI.off('datesSet', updateTitle);
      };
    }
  }, [calendarAPI]);

  return (
    <div className="my-4 flex flex-col">
      <SwitchButton
        isSwitch={isSwitch}
        isCalendar={true}
        label1={'월'}
        label2={'주'}
        func1={() => handleViewChange('dayGridMonth')}
        func2={() => handleViewChange('timeGridWeek')}
        goToday={handleToday}
      />
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={handlePrev}>
          <ArrowLeft className={'w-8 h-8 text-mainText'} />
        </button>
        {/* title */}
        <h3 className="font-bold">{title}</h3>
        <button type="button" className="w-8" onClick={handleNext}>
          <ArrowRight className={'w-8 h-8 text-mainText'} />
        </button>
      </div>
    </div>
  );
}
