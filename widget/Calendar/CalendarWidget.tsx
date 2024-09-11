import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';
import dayjs, { Dayjs } from 'dayjs';

export default function CalendarWidget() {
  const today = dayjs();
  const monthName = today.format('MMM').toUpperCase();

  // 해당 월의 일수를 가져오는 함수
  const getDaysInMonth = (date: Dayjs) => {
    return Array.from({ length: date.daysInMonth() }, (_, i) => i + 1);
  };

  // 해당 월의 첫 번째 날의 요일 인덱스를 가져오는 함수
  const getFirstDayOfMonth = (date: Dayjs) => {
    return date.startOf('month').day();
  };

  const daysInMonth = getDaysInMonth(today);
  const firstDayIndex = getFirstDayOfMonth(today);

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
          const date = today.date(day); // Day.js의 date() 메서드를 사용하여 날짜 설정
          const dayOfWeek = date.day();
          const isToday = today.isSame(date, 'day');

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
