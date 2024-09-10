import CalendarWidget from 'widget/Calendar/CalendarWidget';
import ReminderWidget from 'widget/Reminder/ReminderWidget';

export default function DashBoard() {
  return (
    <div className="flex flex-wrap gap-6 px-8 pt-8 mt-2">
      <CalendarWidget />
      <ReminderWidget />
    </div>
  );
}
