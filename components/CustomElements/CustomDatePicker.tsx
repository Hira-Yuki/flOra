import { ArrowLeft, ArrowRight } from '@components/icons';
import '@styles/custom-react-datepicker.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import TimePicker from './CustomTimePicker';

export default function CustomDatePicker({ label }) {
  const [startDate, setStartDate] = useState(dayjs().toDate());
  const [viewMonth, setViewMonth] = useState(dayjs().month());

  const onChange = (date) => {
    setStartDate(date);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="text-right ml-3 w-14">{label}</label>
      <div className="flex">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          portalId="root"
          dateFormat="YYYY. MM. dd"
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="flex justify-between items-center px-2 py-2">
              <span className="text-sm font-bold text-floraOlive">
                {dayjs(date).format('MMM YYYY').toUpperCase()}
              </span>
              <div>
                <button
                  onClick={() => {
                    decreaseMonth();
                    setViewMonth(dayjs(date).subtract(1, 'month').month()); // 월이 변경될 때 상태 업데이트
                  }}
                  className="mr-2"
                >
                  <ArrowLeft className={'w-[18px] h-[18px]'} />
                </button>
                <button
                  onClick={() => {
                    increaseMonth();
                    setViewMonth(dayjs(date).add(1, 'month').month()); // 월이 변경될 때 상태 업데이트
                  }}
                >
                  <ArrowRight className={'w-[18px] h-[18px]'} />
                </button>
              </div>
            </div>
          )}
          formatWeekDay={(day) => day[0]} // 요일을 한 글자로 표시
          dayClassName={
            (date) =>
              dayjs(date).month() === viewMonth // 현재 보고 있는 달과 비교
                ? '' // 현재 보고 있는 달이면 스타일을 변경하지 않음
                : 'opacity-60' // 선택된 달이 아니면 흐리게 처리
          }
        />
        <TimePicker />
      </div>
    </div>
  );
}
