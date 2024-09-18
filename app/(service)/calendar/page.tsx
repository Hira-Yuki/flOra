'use client';
import Header from '@components/Calendar/Header';
import Toolbar from '@components/Calendar/Toolbar';
import { INDEX_COLORS } from '@constants';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { useCallback, useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.extend(timezone);

const localizer = dayjsLocalizer(dayjs);

// 샘플 이벤트 데이터
const events = [
  {
    title: '회의',
    start: new Date(2024, 8, 1, 10, 0), // 2024년 9월 1일 10시
    end: new Date(2024, 8, 1, 12, 0), // 2024년 9월 1일 12시
    color: 'indexCyan', // 이벤트 색상
  },
  {
    title: '추석 연휴',
    start: new Date(2024, 8, 16, 0, 0),
    end: new Date(2024, 8, 18, 23, 59),
    color: 'indexRed',
  },
  {
    title: '가족 모임',
    start: new Date(2024, 8, 17, 2, 0),
    end: new Date(2024, 8, 17, 17, 0),
    color: 'indexLavender',
  },
];

const eventStyleGetter = (event) => {
  return { style: { backgroundColor: INDEX_COLORS[event.color] || '#c2c2c2' } };
};

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

  const onNavigate = useCallback(
    (newDate) => {
      console.log('Navigating to: ', newDate);
      setDate(newDate);
    },
    [setDate],
  );
  const onView = useCallback((newView) => setView(newView), [view]);

  useEffect(() => {
    console.log('Date has been updated: ', date);
  }, [date]);

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-2">
        <Calendar
          date={date}
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: Toolbar,
            header: Header, // 요일 헤더를 커스텀
          }}
          onNavigate={onNavigate}
          onView={onView}
          view={view}
          style={{
            height: 678,
            width: '100%',
            backgroundColor: '#F6F3ED',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        />
      </div>
      <div className="col-span-1">1</div>
      <div className="col-span-1">1</div>
    </div>
  );
}
