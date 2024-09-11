import CalendarWidget from 'widget/Calendar/CalendarWidget';
import MotivationWidget from 'widget/Motivation/MotivationWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';

export default function DashBoard() {
  return (
    <div className="flex flex-wrap gap-6 p-8 mt-2">
      <CalendarWidget />
      <ReminderWidget />
      <MotivationWidget />
    </div>
  );
}
