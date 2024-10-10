import { useEffect, useId, useState } from 'react';

export default function CustomRoutineSelector({
  label,
  day_of_week,
  onChange,
}) {
  const idPrefix = useId(); // 공통 접두사로 고유한 ID 생성
  const weekday = [
    { id: `${idPrefix}-mon`, label: '월', value: 'MONDAY' },
    { id: `${idPrefix}-tue`, label: '화', value: 'TUESDAY' },
    { id: `${idPrefix}-wed`, label: '수', value: 'WEDNESDAY' },
    { id: `${idPrefix}-thu`, label: '목', value: 'THURSDAY' },
    { id: `${idPrefix}-fri`, label: '금', value: 'FRIDAY' },
    { id: `${idPrefix}-sat`, label: '토', value: 'SATURDAY' },
    { id: `${idPrefix}-sun`, label: '일', value: 'SUNDAY' },
  ];

  // 부모 컴포넌트로부터 받은 요일 정보로 상태 초기화
  const [selectedDays, setSelectedDays] = useState(
    weekday.reduce(
      (acc, day) => ({
        ...acc,
        [day.value]: day_of_week.includes(day.value),
      }),
      {},
    ),
  );

  // 매일 체크 여부 상태 관리
  const [isEveryday, setIsEveryday] = useState(day_of_week.length === 7);

  // selectedDays가 변경될 때마다 모든 요일이 선택되었는지 확인
  useEffect(() => {
    const allSelected = Object.values(selectedDays).every(
      (isSelected) => isSelected,
    );
    setIsEveryday(allSelected);
    onChange(Object.keys(selectedDays).filter((day) => selectedDays[day]));
  }, [selectedDays]);

  // 언마운트 시 빈 배열을 부모에게 전달
  useEffect(() => {
    return () => {
      onChange([]);
    };
  }, []);

  // 개별 요일 체크박스 상태 변경
  const handleDayChange = (value) => {
    setSelectedDays((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  // 매일 체크 시 모든 요일의 체크 상태 변경
  const handleEverydayToggle = () => {
    const newCheckedState = !isEveryday;
    setIsEveryday(newCheckedState);

    const updatedDays = weekday.reduce(
      (acc, day) => ({ ...acc, [day.value]: newCheckedState }),
      {},
    );
    setSelectedDays(updatedDays);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="text-right ml-3 w-16 text-descText">{label}</label>
      <fieldset className="flex gap-2">
        {weekday.map((day) => (
          <div key={day.id} className="flex items-center">
            <input
              type="checkbox"
              id={day.id}
              value={day.value}
              checked={selectedDays[day.value]}
              className="peer sr-only"
              onChange={() => handleDayChange(day.value)}
            />
            <label
              htmlFor={day.id}
              className="flex items-center justify-center w-9 h-9 bg-floraBeige rounded-lg text-mainText peer-checked:bg-floraGreen peer-checked:text-white"
            >
              {day.label}
            </label>
          </div>
        ))}
        <div className="flex items-center gap-[6px] ml-[6px]">
          <input
            type="checkbox"
            checked={isEveryday}
            onChange={handleEverydayToggle}
          />
          <label className="text-mainText text-sm">매일</label>
        </div>
      </fieldset>
    </div>
  );
}
