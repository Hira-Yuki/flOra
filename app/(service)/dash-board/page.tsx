import AccumulatedTimeWidget from 'widget/AccumulatedTime/AccumulatedTimeWidget';
import CalendarWidget from 'widget/Calendar/CalendarWidget';
import DDayWidget from 'widget/DDay/DDayWidget';
import LargeTaskManager from 'widget/LargeTaskManager/LargeTaskManager';
import MotivationWidget from 'widget/Motivation/MotivationWidget';
import MyCharacterWidget from 'widget/MyCharacter/MyCharacterWidget';
import PicFrameWidget from 'widget/PicFrame/PicFrameWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';
import TaskManager from 'widget/TaskManager/TaskManager';
import TimerWidget from 'widget/Timer/TimerWidget';

export default function DashBoard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols8 2xl:grid-cols-8 gap-6">
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-2 row-span-1">
        <CalendarWidget />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-2 row-span-1">
        <ReminderWidget />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-3 row-span-1">
        <MotivationWidget />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-1 row-span-1">
        <DDayWidget />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-3 row-span-1">
        <TaskManager title={'스터디 루틴'} />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-3 row-span-1">
        <TaskManager title={'라이프 루틴'} />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-2 row-span-1">
        <PicFrameWidget />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-3 row-span-2">
        <LargeTaskManager title={'스터디 비루틴'} />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-3 row-span-2">
        <LargeTaskManager title={'라이프 비루틴'} />
      </div>
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-2 row-span-1">
        <TimerWidget />
      </div>
      {/* 추가 위젯 1 */}
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-1 row-span-1">
        <AccumulatedTimeWidget />
      </div>
      {/* 추가 위젯 2 */}
      <div className="col-span-4 sm:col-span-4 md:col-span-6 lg: xl:col-span-6 2xl:col-span-1 row-span-1">
        <MyCharacterWidget />
      </div>
    </div>
  );
}
