'use client';

import { useEffect, useState } from 'react';

/** 
예시 일정 데이터 
***********************
임시 데이터임!!!!!!!!!!
***********************
*/
const events = [{ date: '2024-09-15' }, { date: '2024-09-22' }];

export default function CalendarWidget() {
  // 현재 날짜를 기준으로 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    setToday(new Date());
  }, []);

  // 일정이 있는 날짜인지 확인하는 함수
  const hasEvent = (date: string) => {
    return events.some((event) => event.date === date);
  };

  // 현재 보고 있는 월의 이름과 년도 가져오기
  const monthName = currentDate
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();

  const year = currentDate.getFullYear();

  // 현재 월의 날짜 배열 생성
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    return Array.from({ length: date.getDate() }, (_, i) => i + 1);
  };

  // 현재 월의 첫 번째 날짜가 시작하는 요일 계산
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, currentDate.getMonth());
  const firstDayIndex = getFirstDayOfMonth(year, currentDate.getMonth());

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  return (
    <div className="bg-gray-700 rounded-2xl p-4 w-96 text-gray-100 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-semibold text-xl ml-2">
          {monthName}
        </span>
        <div className="flex justify-center items-center">
          {/* 이전 월로 이동 버튼 */}
          <button
            onClick={goToPreviousMonth}
            className="text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            &lt;
          </button>
          {year}
          {/* 다음 월로 이동 버튼 */}
          <button
            onClick={goToNextMonth}
            className="text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center gap-y-1">
        {/* 요일 */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <span key={`${day}-${index}`} className="text-gray-400">
            {day}
          </span>
        ))}
        {/* 첫 번째 요일 앞에 빈 공간 채우기 */}
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {/* 날짜 */}
        {daysInMonth.map((day) => {
          const date = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
            day,
          ).padStart(2, '0')}`;

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === currentDate.getMonth() &&
            today.getDate() === day;

          return (
            <div key={day} className="flex flex-col items-center relative">
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full cursor-pointer hover:bg-gray-600 transition ${isToday ? 'bg-red-400' : ''}`}
              >
                {day}
              </span>
              {/* 일정이 있는 날짜 아래 점 표시 */}
              {hasEvent(date) && (
                <span className="w-1 h-1 bg-red-400 rounded-full absolute top-6"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
