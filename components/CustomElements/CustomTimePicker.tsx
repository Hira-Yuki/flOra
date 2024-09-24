import { useInput } from '@hooks';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default function TimePicker() {
  const hoursInput = useInput('09'); // 기본 시간 설정
  const minutesInput = useInput('00'); // 기본 분 설정
  const amPmInput = useInput('오전'); // 기본 AM/PM 설정

  // 컴포넌트가 마운트될 때 현재 시간을 받아옴
  useEffect(() => {
    const now = dayjs(); // 현재 시간 가져오기
    const currentHour = now.hour();
    const currentMinutes = now.minute();

    hoursInput.onChange({
      target: { value: String(currentHour % 12).padStart(2, '0') }, // 0~11로 설정 (0이 자정을 나타냄)
    });
    minutesInput.onChange({
      target: { value: String(currentMinutes).padStart(2, '0') },
    });
    amPmInput.onChange({
      target: { value: currentHour >= 12 ? '오후' : '오전' },
    });
  }, []);

  // 화살표 키로 AM/PM 전환
  const handleAmPmKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      amPmInput.onChange({
        target: { value: amPmInput.value === '오전' ? '오후' : '오전' },
      });
    }
  };

  // 시간 변경 함수 (0~12 범위)
  const handleHoursKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let currentHours = Number(hoursInput.value);

    if (e.key === 'ArrowUp' && currentHours < 12) {
      currentHours += 1;
    } else if (e.key === 'ArrowDown' && currentHours > 0) {
      currentHours -= 1;
    }

    hoursInput.onChange({
      target: { value: String(currentHours).padStart(2, '0') },
    });
  };

  // 분 변경 함수 (0~59 범위)
  const handleMinutesKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let currentMinutes = Number(minutesInput.value);

    if (e.key === 'ArrowUp' && currentMinutes < 59) {
      currentMinutes += 1;
    } else if (e.key === 'ArrowDown' && currentMinutes > 0) {
      currentMinutes -= 1;
    }

    minutesInput.onChange({
      target: { value: String(currentMinutes).padStart(2, '0') },
    });
  };

  return (
    <div className="flex items-center text-mainText">
      {/* 오전/오후 입력 */}
      <input
        type="text"
        value={amPmInput.value}
        onChange={amPmInput.onChange}
        onKeyDown={handleAmPmKeyDown}
        className="w-8 text-center border-none bg-transparent rounded-md outline-none focus:bg-objectGray mr-2"
      />

      {/* 시간 입력 */}
      <StyledInput
        value={hoursInput.value}
        onChange={hoursInput.onChange}
        onKeyDown={handleHoursKeyDown}
      />
      <span className="">:</span>

      {/* 분 입력 */}
      <StyledInput
        value={minutesInput.value}
        onChange={minutesInput.onChange}
        onKeyDown={handleMinutesKeyDown}
      />
    </div>
  );
}

const StyledInput = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-5 text-center border-none bg-transparent rounded-md outline-none focus:bg-objectGray"
    />
  );
};
