import { useToggle } from '@hooks';

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

  return (
    <div className="flex items-center gap-2" onClick={checked.toggleValue}>
      <input
        type="checkbox"
        checked={checked.value}
        onChange={checked.toggleValue}
        className="sr-only"
      />
      <label
        className={`w-6 h-6 ${borderClass[indexColor]} ${checked.value && `${bgClass[indexColor]} opacity-40`} border-[3px] rounded-md relative  hover:opacity-80 cursor-pointer`}
      >
        {checked.value && (
          <div className="absolute w-2 h-4 border-b-[3px] border-r-[3px] border-white transform rotate-45 right-1.5" />
        )}
      </label>
      <label
        className={`${checked.value ? 'text-subText line-through' : 'text-black'}  ${line1 ? 'line-clamp-1' : 'line-clamp-2'} overflow-ellipsis cursor-pointer`}
      >
        {text}
      </label>
    </div>
  );
}
