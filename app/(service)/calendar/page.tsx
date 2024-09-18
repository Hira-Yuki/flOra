'use client';
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

// 샘플 이벤트 데이터
const events = [
  {
    title: '회의',
    start: new Date(2024, 8, 1, 10, 0), // 2024년 9월 1일 10시
    end: new Date(2024, 8, 1, 12, 0), // 2024년 9월 1일 12시
    color: 'indexRed', // 이벤트 색상
  },
  // 다른 이벤트 추가 가능
];

const eventStyleGetter = (event) => {
  const backgroundColor =
    {
      indexRed: '#FA897B',
      indexYellow: '#FFDD94',
      indexGreen: '#D0E6A5',
      indexCyan: '#86DDE3',
      indexLavender: '#CCABD8',
    }[event.color] || '#3c3c3c'; // 기본 색상

  return {
    style: {
      backgroundColor,
      borderRadius: '5px',
      color: 'white',
      border: '0',
      display: 'block',
    },
  };
};

export default function CalendarPage() {
  return (
    <>
      <Calendar
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
      />
    </>
  );
}
