'use client';
import Diary from '@components/Calendar/Diary';
import FloatButtons from '@components/Calendar/FloatButtons';
import FloraCalendar from '@components/Calendar/FloraCalendar';
import TodoList from '@components/Calendar/TodoList';
import CustomModal from '@components/CustomElements/CustomModal';
import { useToggle } from '@hooks';
import DDayWidget from 'widget/DDay/DDayWidget';

export default function CalendarPage() {
  const modalController = useToggle(false);

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
      <FloatButtons modalController={modalController} />
      <CustomModal aria_label={'모달 컨텐츠'} modalController={modalController}>
        내용
      </CustomModal>
    </div>
  );
}
