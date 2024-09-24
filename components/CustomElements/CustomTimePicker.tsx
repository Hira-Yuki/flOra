import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function TimePicker() {
  const [hours, setHours] = useState('09'); // 기본 시간 설정
  const [minutes, setMinutes] = useState('00'); // 기본 분 설정
  const [amPm, setAmPm] = useState('오전'); // 기본 AM/PM 설정

  // 컴포넌트가 마운트될 때 현재 시간을 받아옴
  useEffect(() => {
    const now = dayjs(); // 현재 시간 가져오기
    const currentHour = now.hour();
    const currentMinutes = now.minute();

    setHours(String(currentHour % 12 || 12).padStart(2, '0')); // 12시간 형식으로 변환 및 두 자릿수
    setMinutes(String(currentMinutes).padStart(2, '0')); // 분 두 자릿수
    setAmPm(currentHour >= 12 ? '오후' : '오전'); // 오전/오후 설정
  }, []);

  // AM/PM 전환 함수 (ArrowUp, ArrowDown 키로 전환)
  const handleAmPmKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      setAmPm((prev) => (prev === '오전' ? '오후' : '오전'));
    }
  };

  // 시간 변경 함수 (1~12 범위)
  const handleHoursChange = (e) => {
    let input = e.target.value;

    // 숫자 이외의 값은 제거
    input = input.replace(/\D/g, '');

    // 입력값이 1~12 사이가 아니면 무시, 2자리까지만 허용
    if (input.length > 2) {
      input = input.slice(-2); // 마지막 두 자리만 유지
    }

    if (Number(input) >= 0 && Number(input) <= 12) {
      setHours(input.padStart(2, '0')); // 두 자릿수로 패딩
    }
  };

  // 화살표 키로 시간 조정 (ArrowUp, ArrowDown)
  const handleHoursKeyDown = (e) => {
    let currentHours = Number(hours);

    if (e.key === 'ArrowUp' && currentHours < 12) {
      currentHours += 1; // 12보다 작을 때만 증가
    } else if (e.key === 'ArrowDown' && currentHours > 0) {
      currentHours -= 1; // 0보다 클 때만 감소
    }

    setHours(String(currentHours).padStart(2, '0'));
  };

  // 분 변경 함수 (0~59 범위)
  const handleMinutesChange = (e) => {
    let input = e.target.value;

    // 숫자 이외의 값은 제거
    input = input.replace(/\D/g, '');

    // 입력값이 0~59 사이가 아니면 무시, 2자리까지만 허용
    if (input.length > 2) {
      input = input.slice(-2); // 마지막 두 자리만 유지
    }

    if (Number(input) >= 0 && Number(input) <= 59) {
      setMinutes(input.padStart(2, '0')); // 두 자릿수로 패딩
    }
  };

  // 화살표 키로 분 조정 (ArrowUp, ArrowDown)
  const handleMinutesKeyDown = (e) => {
    let currentMinutes = Number(minutes);

    if (e.key === 'ArrowUp' && currentMinutes < 59) {
      currentMinutes += 1; // 59보다 작을 때만 증가
    } else if (e.key === 'ArrowDown' && currentMinutes > 0) {
      currentMinutes -= 1; // 0보다 클 때만 감소
    }

    setMinutes(String(currentMinutes).padStart(2, '0'));
  };

  return (
    <div className="flex items-center">
      {/* 오전/오후 입력 */}
      <input
        type="text"
        value={amPm}
        // onChange={() => { }} // 직접 입력은 막음
        onKeyDown={handleAmPmKeyDown} // 화살표 키로 전환
        className="text-sm mr-2 w-12 text-center border-none bg-transparent"
      />

      {/* 시간 입력 */}
      <input
        type="text"
        value={hours} // 시간 두 자릿수로
        onChange={handleHoursChange}
        onKeyDown={handleHoursKeyDown}
        className="w-10 text-center border-none bg-transparent"
      />
      <span className="mx-1">:</span>

      {/* 분 입력 */}
      <input
        type="text"
        value={minutes} // 분 두 자릿수로
        onChange={handleMinutesChange}
        onKeyDown={handleMinutesKeyDown}
        className="w-10 text-center border-none bg-transparent"
      />
    </div>
  );
}
