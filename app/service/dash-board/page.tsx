import CalendarWidget from 'widget/Calendar/CalendarWidget';
import DDayWidget from 'widget/DDay/DDayWidget';
import LargeTaskManager from 'widget/LargeTaskManager/LargeTaskManager';
import MotivationWidget from 'widget/Motivation/MotivationWidget';
import PicFrameWidget from 'widget/PicFrame/PicFrameWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';
import TaskManager from 'widget/TaskManager/TaskManager';

export default function DashBoard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
      <div className="col-span-2 row-span-1">
        <CalendarWidget />
      </div>
      <div className="col-span-2 row-span-1">
        <ReminderWidget />
      </div>
      <div className="col-span-3 row-span-1">
        <MotivationWidget />
      </div>
      <div className="col-span-2 sm:col-span-1 row-span-1">
        <DDayWidget />
      </div>
      <div className="col-span-3 row-span-1">
        <TaskManager title={'스터디 루틴'} />
      </div>
      <div className="col-span-3 row-span-1">
        <TaskManager title={'라이프 루틴'} />
      </div>
      <div className="col-span-2 row-span-1">
        <PicFrameWidget />
      </div>
      <div className="col-span-3 row-span-2">
        <LargeTaskManager title={'스터디 비루틴'} />
      </div>
      <div className="col-span-3 row-span-2">
        <LargeTaskManager title={'라이프 비루틴'} />
      </div>
      {/* 추가 위젯 1 */}
      <div className="col-span-2 row-span-1">
        {/* Add your first additional widget here */}
      </div>
      {/* 추가 위젯 2 */}
      <div className="col-span-2 row-span-1">
        {/* Add your second additional widget here */}
      </div>
    </div>
  );
}
