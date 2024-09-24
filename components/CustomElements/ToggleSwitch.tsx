import { SmallFalseIcon, SmallTrueIcon } from '@components/icons';
import { useToggle } from '@hooks';
import { useId } from 'react';

export default function ToggleSwitch({ label, initialValue = false }) {
  const checked = useToggle(initialValue);
  const id = useId();
  return (
    <div className="flex items-center gap-4">
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked.value}
        onChange={checked.toggleValue}
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
