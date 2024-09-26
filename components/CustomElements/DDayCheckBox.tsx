import { useId } from 'react';

export default function DDayCheckBox({ label, checked, onChange }) {
  const checkId = useId();

  const handleOptionChange = (event) => {
    onChange(event.target.checked); // 부모 컴포넌트로 선택된 값을 전달
  };

  return (
    <div className="flex gap-1 justify-center items-center min-w-[116px]">
      <label
        htmlFor={checkId}
        className="cursor-pointer block whitespace-nowrap"
      >
        {label}
      </label>
      <input
        id={checkId}
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={handleOptionChange}
      />
      <label
        htmlFor={checkId}
        className="relative w-4 h-4 border border-mainText peer-checked:before:content-['✓'] peer-checked:before:absolute before:-top-1.5 before:text-mainText cursor-pointer"
      />
    </div>
  );
}
