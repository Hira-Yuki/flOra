// app/ServerCalendar.tsx
interface ServerCalendarProps {
  timeZone: string;
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  today: Date;
}

export default function ServerCalendar({
  timeZone,
  currentDate,
  onPreviousMonth,
  onNextMonth,
  today,
}: ServerCalendarProps) {
  const events = [{ date: '2024-09-15' }, { date: '2024-09-22' }];

  // 일정이 있는 날짜인지 확인하는 함수
  const hasEvent = (date: string) => {
    return events.some((event) => event.date === date);
  };

  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    timeZone,
  })
    .format(currentDate)
    .toUpperCase();

  const year = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    timeZone,
  }).format(currentDate);

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
    <div className="bg-gray-700 rounded-2xl p-4 w-96 text-gray-100 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-semibold text-xl ml-2">
          {monthName}
        </span>
        <div className="flex justify-center items-center">
          {/* 이전 월로 이동 버튼 */}
          <button
            onClick={onPreviousMonth}
            className="text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            &lt;
          </button>
          {year}
          {/* 다음 월로 이동 버튼 */}
          <button
            onClick={onNextMonth}
            className="text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center gap-y-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={`${day}-${index}`} className="text-gray-400">
            {day}
          </span>
        ))}
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {daysInMonth.map((day) => {
          const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
            day,
          ).padStart(2, '0')}`;

          const isToday =
            today.getFullYear() === Number(year) &&
            today.getMonth() === currentDate.getMonth() &&
            today.getDate() === day;

          return (
            <div key={day} className="flex flex-col items-center relative">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full cursor-pointer hover:bg-gray-600 transition ${isToday ? 'bg-red-400' : ''}`}
              >
                {day}
              </span>
              {hasEvent(date) && (
                <div className="w-1 h-1 bg-red-400 rounded-full absolute top-6"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
