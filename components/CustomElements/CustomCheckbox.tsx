import { bgClass, borderClass } from '@constants';
import { useToggle } from '@hooks';

export default function CustomCheckbox({
  initialValue = false,
  indexColor = 'indexRed',
  text = '',
  line1 = true,
}) {
  const checked = useToggle(initialValue);

  if (checked.value) {
    return (
      <div className="flex justify-center items-center gap-2">
        <div
          className={`w-6 h-6 ${borderClass[indexColor]} ${bgClass[indexColor]} border-2 rounded-md relative opacity-40 hover:opacity-80 cursor-pointer`}
          onClick={checked.toggleValue}
        >
          <div className="absolute w-2 h-4 border-b-[3px] border-r-[3px] border-white transform rotate-45 right-1.5" />
        </div>
        <label
          className={`text-subText overflow-ellipsis ${line1 ? 'line-clamp-1' : 'line-clamp-2'} line-clamp-1 line-through flex-1`}
        >
          {text}
        </label>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className={`w-6 h-6 ${borderClass[indexColor]} border-[3px] rounded-md hover:opacity-60 cursor-pointer`}
        onClick={checked.toggleValue}
      />
      <label
        className={`text-black overflow-ellipsis ${line1 ? 'line-clamp-1' : 'line-clamp-2'} flex-1`}
      >
        {text}
      </label>
    </div>
  );
}
