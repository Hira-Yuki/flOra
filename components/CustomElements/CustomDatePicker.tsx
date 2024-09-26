import { ArrowLeft, ArrowRight } from '@components/icons';
import '@styles/custom-react-datepicker.css';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';

import CustomDatePickerInput from './CustomDatePickerInput';
import CustomTimePicker from './CustomTimePicker';

export default function CustomDatePicker({
  label,
  value,
  onChange,
  type,
  startDate,
  state,
  endDate,
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-right ml-3 w-14">{label}</label>
      <div className="flex">
        <DatePicker
          selected={value}
          onChange={onChange}
          portalId="root"
          dateFormat="YYYY. MM. dd"
          customInput={<CustomDatePickerInput />}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="flex justify-between items-center px-2 py-2">
              <span className="text-sm font-bold text-floraOlive">
                {dayjs(date).format('MMM YYYY').toUpperCase()}
              </span>
              <div>
                <button
                  onClick={() => {
                    decreaseMonth();
                    onChange(dayjs(date).subtract(1, 'month').toDate());
                  }}
                  className="mr-2"
                >
                  <ArrowLeft className={'w-[18px] h-[18px]'} />
                </button>
                <button
                  onClick={() => {
                    increaseMonth();
                    onChange(dayjs(date).add(1, 'month').toDate());
                  }}
                >
                  <ArrowRight className={'w-[18px] h-[18px]'} />
                </button>
              </div>
            </div>
          )}
          formatWeekDay={(day) => day[0]} // 요일을 한 글자로 표시
          dayClassName={(date) => {
            return dayjs(date).month() === dayjs(value).month() // 현재 보고 있는 달과 비교
              ? '' // 현재 보고 있는 달이면 스타일을 변경하지 않음
              : 'opacity-60'; // 선택된 달이 아니면 흐리게 처리
          }}
        />
      </div>
      {!state.isAllDay && (
        <CustomTimePicker
          endDate={endDate}
          startDate={startDate}
          value={value}
          handleDate={onChange}
          type={type}
        />
      )}
    </div>
  );
}
