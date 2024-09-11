import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';
import dayjs, { Dayjs } from 'dayjs';

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const weekendDays = new Set([0, 6]); // 토요일과 일요일

export default function CalendarWidget() {
  const today = dayjs();
  const monthName = today.format('MMM').toUpperCase();

  // 해당 월의 일수를 가져오는 함수
  const getDaysInMonth = (date: Dayjs) =>
    Array.from({ length: date.daysInMonth() }, (_, i) => i + 1);

  // 해당 월의 첫 번째 날의 요일 인덱스를 가져오는 함수
  const getFirstDayOfMonth = (date: Dayjs) => date.startOf('month').day();

  const daysInMonth = getDaysInMonth(today);
  const firstDayIndex = getFirstDayOfMonth(today);

  // 날짜 배열을 미리 생성하여 반복적인 객체 생성 방지
  const dates = daysInMonth.map((day) => today.date(day));

  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-lg sm:text-xl ml-2 text-floraOlive">
          {monthName}
        </span>
      </div>
      <div className="grid grid-cols-7 text-center gap-y-0.5">
        {weekDays.map((day, index) => (
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
        {dates.map((date) => {
          const day = date.date(); // 날짜를 추출
          const dayOfWeek = date.day(); // 요일을 추출
          const isToday = today.isSame(date, 'day');

          const dayClass = weekendDays.has(dayOfWeek)
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
