import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import { useRef } from 'react';

import CustomHeader from './CustomHeader';

const initialize = {
  tz: 'Asia/seoul',
  lc: 'en',
  initialView: 'dayGridMonth',
  nowIndicator: true,
  fixedWeekCount: false,
  height: 'auto',
  plugins: [dayGridPlugin, timeGridPlugin],
};

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

export default function FloraCalendar() {
  const calendarRef = useRef<FullCalendar>();

  return (
    <div className="col-span-4 row-span-5 rounded-2xl bg-floraBeige h-full p-4 overflow-auto">
      <CustomHeader calendarRef={calendarRef} />
      <FullCalendar
        ref={calendarRef}
        nowIndicator={initialize.nowIndicator}
        fixedWeekCount={initialize.fixedWeekCount}
        timeZone={initialize.tz}
        locale={initialize.lc}
        plugins={initialize.plugins}
        initialView={initialize.initialView}
        headerToolbar={false}
        height={initialize.height}
        events={events}
        views={{
          dayGridMonth: {
            dayHeaderFormat: {
              weekday: 'narrow',
            },
          },
          timeGridWeek: {
            dayHeaderContent: (args) => {
              const date = dayjs(args.date);
              const weekday = date.format('ddd').charAt(0); // '요일'
              const day = date.format('DD'); // '날짜'
              return (
                <div className="flex flex-col items-center">
                  <div>{weekday}</div>
                  <div>{day}</div>
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
}
