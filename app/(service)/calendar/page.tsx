'use client';
import Diary from '@components/Calendar/Diary';
import FloatButtons from '@components/Calendar/FloatButtons';
import FloraCalendar from '@components/Calendar/FloraCalendar';
import TodoList from '@components/Calendar/TodoList';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DDayWidget from 'widget/DDay/DDayWidget';

dayjs.extend(timezone);

export default function CalendarPage() {
  return (
    <div className="grid grid-cols-8 grid-rows-7 gap-6 h-full">
      {/* 달력 컴포넌트 */}
      <FloraCalendar />
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
      <FloatButtons />
    </div>
  );
}
