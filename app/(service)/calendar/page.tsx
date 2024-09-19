'use client';
import Day from '@components/Calendar/Day';
import Header from '@components/Calendar/Header';
import Toolbar from '@components/Calendar/Toolbar';
import { INDEX_COLORS } from '@constants';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { useCallback, useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.extend(timezone);

const localizer = dayjsLocalizer(dayjs);

// 샘플 이벤트 데이터
const events = [
  {
    id: '1',
    title: '회의',
    start: dayjs('2024-09-01 10:30').toDate(), // 2024년 9월 1일 10시 30분
    end: dayjs('2024-09-01 12:00').toDate(), // 2024년 9월 1일 12시
    allDay: false,
    color: 'indexCyan',
  },
  {
    id: '2',
    title: '추석 연휴',
    start: dayjs('2024-09-14 00:00').toDate(),
    end: dayjs('2024-09-18 23:59').toDate(),
    allDay: true,
    color: 'indexRed',
  },
  {
    id: '3',
    title: '가족 모임',
    start: dayjs('2024-10-05 00:00').toDate(),
    end: dayjs('2024-10-05 23:59').toDate(),
    allDay: true,
    color: 'indexLavender',
  },
];

const eventStyleGetter = (event) => {
  return { style: { backgroundColor: INDEX_COLORS[event.color] || '#c2c2c2' } };
};

export default function CalendarPage() {
  const [date, setDate] = useState(dayjs().toDate());
  const [view, setView] = useState(Views.MONTH);

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const onView = useCallback((newView) => setView(newView), [view]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      <div className="col-span-1 lg:col-span-2 h-full">
        <Calendar
          date={date}
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: Toolbar,
            header: Header,
            month: {
              dateHeader: Day,
            },
          }}
          onNavigate={onNavigate}
          onView={onView}
          view={view}
          style={{
            maxHeight: 678,
            height: '100%',
            width: '100%',
            backgroundColor: '#F6F3ED',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        />
      </div>
      <div className="col-span-1">11234</div>
      <div className="col-span-1">11234</div>
    </div>
  );
}
