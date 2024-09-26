import { SmallFalseIcon, SmallTrueIcon } from '@components/icons';
import { useId } from 'react';

export default function ToggleSwitch({ label, checked, onChange }) {
  const id = useId();

  const handleOptionChange = (event) => {
    onChange(event.target.checked); // 부모 컴포넌트로 선택된 값을 전달
  };

  return (
    <div className="flex items-center gap-4 ">
      <label
        htmlFor={id}
        className="cursor-pointer text-right ml-3 text-descText"
      >
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={handleOptionChange}
      />
      <label htmlFor={id} className="block peer-checked:hidden cursor-pointer">
        <SmallFalseIcon />
      </label>
      <label htmlFor={id} className="hidden peer-checked:block cursor-pointer">
        <SmallTrueIcon />
      </label>
    </div>
  );
}
