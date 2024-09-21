'use client';
import Day from '@components/Calendar/Day';
import Diary from '@components/Calendar/Diary';
import Header from '@components/Calendar/Header';
import TodoList from '@components/Calendar/TodoList';
import Toolbar from '@components/Calendar/Toolbar';
import BigCancelIcon from '@components/icons/BigCancelIcon';
import ClockIcon from '@components/icons/ClockIcon';
import EventIcon from '@components/icons/EventIcon';
import GreenAddIcon from '@components/icons/GreenAddIcon';
import PenIcon from '@components/icons/PenIcon';
import TodoICon from '@components/icons/TodoICon';
import { INDEX_COLORS } from '@constants';
import { useToggle } from '@hooks';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { useCallback, useState } from 'react';
import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DDayWidget from 'widget/DDay/DDayWidget';

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
  return {
    style: {
      backgroundColor: INDEX_COLORS[event.color] || '#c2c2c2',
      border: 'none',
      color: '#3c3c3c',
    },
  };
};

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(dayjs().toDate());
  const [view, setView] = useState<'month' | 'week'>(Views.MONTH);
  const addMenuToggle = useToggle();

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );
  const onView = useCallback(
    (newView: 'month' | 'week') => setView(newView),
    [view],
  );

  const onDrillDown = useCallback(
    (newDate) => {
      setDate(newDate);
      setView(Views.WEEK);
    },
    [setDate, setView],
  );

  return (
    <div className="grid grid-cols-8 grid-rows-7 gap-6 h-full">
      <div className="col-span-4 row-span-5 rounded-2xl bg-floraBeige h-full">
        <Calendar
          date={date}
          events={events}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          onDrillDown={onDrillDown}
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
            height: '100%',
            width: '100%',
            padding: '1rem',
          }}
        />
      </div>
      <div className="col-span-2 row-span-7 h-full">
        <TodoList title={'To do List'} subTitle={'Study'} />
      </div>
      <div className="col-span-2 row-span-7 h-full">
        <TodoList title={'To do List'} subTitle={'Life'} />
      </div>
      <div className="col-span-1 row-span-2 h-full">
        <DDayWidget />
      </div>
      <div className="col-span-3 row-span-2 h-full">
        <Diary />
      </div>
      <div className="absolute bottom-6 right-6 cursor-pointer">
        <div className="relative flex flex-col gap-6">
          {addMenuToggle.value && (
            <div className="bg-transparent text-lg flex flex-col gap-2 absolute bottom-20 -left-16">
              <ul className="bg-white px-4 py-2 rounded-xl flex flex-col gap-6">
                <li>
                  <button type="button" className="flex gap-2 hover:opacity-70">
                    <EventIcon />
                    <span>이벤트</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="flex gap-2 hover:opacity-70">
                    <TodoICon />
                    <span>투두</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="flex gap-2 hover:opacity-70">
                    <ClockIcon />
                    <span>디데이</span>
                  </button>
                </li>
              </ul>
              <div className="bg-white px-4 py-1 rounded-xl">
                <button type="button" className="flex gap-2 hover:opacity-70">
                  <PenIcon />
                  <span>일기</span>
                </button>
              </div>
            </div>
          )}
          <div
            className={`transition-transform duration-300 ease-in-out hover:opacity-75 ${addMenuToggle.value ? 'rotate-45' : '-rotate-90'}`}
            onClick={addMenuToggle.toggleValue}
          >
            {addMenuToggle.value ? (
              <BigCancelIcon />
            ) : (
              <div>
                <GreenAddIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
