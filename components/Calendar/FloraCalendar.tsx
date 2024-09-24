import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRef } from 'react';

import CustomHeader from './CustomHeader';

// dayjs 플러그인 활성화
dayjs.extend(utc);
dayjs.extend(timezone);

const initialize = {
  tz: 'asia/seoul',
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
    start: dayjs('2024-09-01 19:30').format(), // 2024년 9월 1일 10시 30분
    end: dayjs('2024-09-01 21:00').format(), // 2024년 9월 1일 12시
    allDay: false,
    color: '#FF5641',
  },
  {
    id: '2',
    title: '회의2',
    start: dayjs('2024-09-02 19:30', 'Asia/Seoul').format(), // 2024년 9월 2일 10시 30분
    end: dayjs('2024-09-02 21:00', 'Asia/Seoul').format(), // 2024년 9월 2일 12시
    allDay: false,
    color: '#FFAE00',
  },
  {
    id: '3',
    title: '추석 연휴',
    start: dayjs('2024-09-14').format(),
    end: dayjs('2024-09-18').format(),
    allDay: true,
    color: '#8CD300',
  },
  {
    id: '4',
    title: '가족 모임',
    start: dayjs('2024-10-05').format(),
    end: dayjs('2024-10-05').format(),
    allDay: true,
    color: '#22D3DE',
  },
  {
    id: '5',
    title: '회의 3',
    start: '2024-09-22T14:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T16:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
  {
    id: '6',
    title: '회의 4',
    start: '2024-09-22T17:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T19:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
  {
    id: '6',
    title: '회의 4',
    start: '2024-09-22T17:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T19:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
  {
    id: '6',
    title: '회의 4',
    start: '2024-09-22T17:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T19:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
  {
    id: '6',
    title: '회의 4',
    start: '2024-09-22T17:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T19:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
  {
    id: '6',
    title: '회의 4',
    start: '2024-09-22T17:30:00', // 2024년 9월 2일 10시 30분
    end: '2024-09-22T19:30:00', // 2024년 9월 2일 12시
    allDay: false,
    color: '#A155BD',
  },
];

export default function FloraCalendar() {
  const calendarRef = useRef<FullCalendar>();

  // 이벤트 스타일을 변경하는 함수
  const applyTimeGridStyles = (info: any) => {
    const eventEl = info.el;
    eventEl.style.fontSize = '12px';
    // allDay 이벤트는 스타일을 변경하지 않음
    if (!info.event.allDay) {
      // timeGrid에서만 스타일을 적용
      if (
        info.view.type === 'timeGridWeek' ||
        info.view.type === 'timeGridDay'
      ) {
        // 배경색을 흐리게
        eventEl.style.backgroundColor = `${info.event.backgroundColor || info.event.color}80`; // 80은 투명도 설정

        // 왼쪽 보더만 설정
        eventEl.style.borderLeft = `4px solid ${info.event.borderColor || info.event.color}`;
        eventEl.style.borderRadius = '0'; // 둥근 테두리 제거
        eventEl.style.borderRight = 'none'; // 오른쪽 보더 제거
        eventEl.style.borderTop = 'none'; // 상단 보더 제거
        eventEl.style.borderBottom = 'none'; // 하단 보더 제거
      }
    }
  };

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
        headerToolbar={false} // 커스텀 툴바를 사용하기 위해 비활성화
        height={initialize.height}
        dayMaxEventRows={3}
        moreLinkClick="popover" // '그 외 N개' 클릭 시 팝오버로 표시
        events={events}
        eventDidMount={applyTimeGridStyles}
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
              const day = date.format('D'); // '날짜'
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
