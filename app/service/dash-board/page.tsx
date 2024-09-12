import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';
import CalendarWidget from 'widget/Calendar/CalendarWidget';
import DDayWidget from 'widget/DDay/DDayWidget';
import MotivationWidget from 'widget/Motivation/MotivationWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';
import TaskManager from 'widget/TaskManager/TaskManager';

export default function DashBoard() {
  return (
    <div className="flex flex-wrap gap-6 p-8 mt-2">
      <CalendarWidget />
      <ReminderWidget />
      <MotivationWidget />
      <DDayWidget />
      <TaskManager title={'스터디 루틴'} />
      <TaskManager title={'비스터디 루틴'} />
      <WidgetWrapper>뭔가 한다...</WidgetWrapper>
    </div>
  );
}
