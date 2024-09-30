import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { eventAPI } from '@lib/api/event';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useRef, useState } from 'react';

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

export default function FloraCalendar() {
  const calendarRef = useRef<FullCalendar>();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await eventAPI.getEvents();

      // 데이터가 배열인지 확인하고, 배열이 아닐 경우 빈 배열로 초기화
      const eventsArray = Array.isArray(data) ? data : [];

      // 각 이벤트를 `eventItem` 형식으로 변환하여 새로운 배열로 저장
      const eventItems = eventsArray.map((event) => ({
        eventId: event.eventId, // 각 이벤트의 ID
        title: event.title, // 이벤트의 제목
        start: event.startDateTime, // 시작 시간
        end: event.endDateTime, // 종료 시간
        allDay: event.allDay, // 하루 종일 여부
        color: event.indexColor, // 색상 (사용자 지정 색상 코드)
      }));

      setEvents(eventItems);
    };
    getEvent();
  }, [setEvents]);

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
