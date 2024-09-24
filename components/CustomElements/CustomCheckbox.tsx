import { useToggle } from '@hooks';
import { useId } from 'react';

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
  line1 = true,
}) {
  const checked = useToggle(initialValue);
  const checkBoxId = useId();

  return (
    <div
      className="flex items-center gap-2 relative"
      onClick={checked.toggleValue}
    >
      <input
        id={checkBoxId}
        type="checkbox"
        checked={checked.value}
        onChange={checked.toggleValue}
        className="sr-only peer"
      />
      <label
        htmlFor={checkBoxId}
        className={`min-w-6 min-h-6 ${borderClass[indexColor]} ${checked.value && `${bgClass[indexColor]}`} peer-checked:${bgClass[indexColor]} peer-checked:opacity-40 border-[3px] rounded-md hover:opacity-80 cursor-pointer`}
      />
      <label
        htmlFor={checkBoxId}
        className="absolute w-2 h-4 border-b-[3px] border-r-[3px] border-white transform rotate-45 left-2 top-1 hidden peer-checked:block"
      />
      <label
        htmlFor={checkBoxId}
        className={`text-black peer-checked:text-subText peer-checked:line-through ${line1 ? 'line-clamp-1' : 'line-clamp-2'} overflow-ellipsis cursor-pointer`}
      >
        {text}
      </label>
    </div>
  );
}
