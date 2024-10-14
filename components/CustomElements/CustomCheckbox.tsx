import { useEffect, useId, useState } from 'react';

const borderClass = {
  indexRed: 'border-indexRed',
  indexYellow: 'border-indexYellow',
  indexGreen: 'border-indexGreen',
  indexCyan: 'border-indexCyan',
  indexLavender: 'border-indexLavender',
} as const;

const bgClass = {
  indexRed: 'bg-indexRed',
  indexYellow: 'bg-indexYellow',
  indexGreen: 'bg-indexGreen',
  indexCyan: 'bg-indexCyan',
  indexLavender: 'bg-indexLavender',
} as const;

export default function CustomCheckbox({
  initialValue = false,
  indexColor = 'indexRed',
  text = '',
  onClick,
}) {
  const [checked, setChecked] = useState(initialValue);
  const checkBoxId = useId();

  // initialValue가 변경되면 checked 상태를 업데이트
  useEffect(() => {
    setChecked(initialValue);
  }, [initialValue]);

  // 체크박스 변경 이벤트 핸들러
  const handleCheckboxChange = () => {
    setChecked((prev) => !prev); // 상태 반전
    onClick(!checked); // 부모 컴포넌트에 새로운 상태 전달
  };

  return (
    <div className="flex items-center gap-2 relative">
      <input
        id={checkBoxId}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="sr-only peer"
      />
      <label
        htmlFor={checkBoxId}
        className={`min-w-6 min-h-6 ${borderClass[indexColor]} ${checked && `${bgClass[indexColor]}`} peer-checked:${bgClass[indexColor]} peer-checked:opacity-40 border-[3px] rounded-md hover:opacity-80 cursor-pointer`}
      >
        {checked && (
          <label
            htmlFor={checkBoxId}
            className="absolute w-2 h-4 border-b-[3px] border-r-[3px] border-white transform rotate-45 left-2"
          />
        )}
      </label>

      <label
        htmlFor={checkBoxId}
        className={`text-black peer-checked:text-subText peer-checked:line-through line-clamp-2 overflow-ellipsis cursor-pointer`}
      >
        {text}
      </label>
    </div>
  );
}
