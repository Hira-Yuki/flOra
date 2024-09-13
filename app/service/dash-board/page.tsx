import CalendarWidget from 'widget/Calendar/CalendarWidget';
import DDayWidget from 'widget/DDay/DDayWidget';
import MotivationWidget from 'widget/Motivation/MotivationWidget';
import PicFrameWidget from 'widget/PicFrame/PicFrameWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';
import TaskManager from 'widget/TaskManager/TaskManager';

export default function DashBoard() {
  return (
    <div className="flex flex-wrap gap-6">
      <CalendarWidget />
      <ReminderWidget />
      <MotivationWidget />
      <DDayWidget />
      <TaskManager title={'스터디 루틴'} />
      <TaskManager title={'라이프 루틴'} />
      <PicFrameWidget />
    </div>
  );
}
