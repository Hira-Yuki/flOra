import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';

interface ServerCalendarProps {
  timeZone: string;
  currentDate: Date;
  today: Date;
}

export default function ServerCalendar({
  timeZone,
  currentDate,
  today,
}: ServerCalendarProps) {
  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone,
  })
    .format(currentDate)
    .toUpperCase();

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const firstDayIndex = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-lg sm:text-xl ml-2 text-floraOlive">
          {monthName}
        </span>
      </div>
      <div className="grid grid-cols-7 text-center gap-y-0.5">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span
            key={`${day}-${index}`}
            className={`text-mainText text-xs sm:text-sm font-bold ${day === 'S' && 'text-subText'}`}
          >
            {day}
          </span>
        ))}
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((day) => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
          );
          const dayOfWeek = date.getDay();
          const isToday = today.getDate() === day;

          const dayClass =
            dayOfWeek === 0 || dayOfWeek === 6
              ? 'text-gray-500'
              : 'text-mainText';

          return (
            <div key={day} className="flex flex-col items-center relative">
              <span
                className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 font-semibold rounded-full 
                  cursor-pointer hover:bg-floraWhite transition ${isToday && 'bg-floraYellow'} ${dayClass}`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </WidgetWrapper>
  );
}
