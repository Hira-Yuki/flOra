import CalendarWidget from 'widget/Calendar/CalendarWidget';

export default function DashBoard() {
  return (
    <div className="flex flex-wrap gap-6 px-8 pt-8">
      <CalendarWidget />
    </div>
  );
}
