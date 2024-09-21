import { bgClass } from '@constants';

interface CustomBorderItemProps {
  indexColor: string;
  text: string;
  subText?: string;
}

export default function CustomBorderItem({
  indexColor,
  text,
  subText,
}: CustomBorderItemProps) {
  return (
    <li className="text-lg leading-none pl-4 relative cursor-pointer">
      {/* 커스텀 둥근 선 보더 */}
      <span
        className={`absolute left-0 top-0 bottom-0 w-1 ${bgClass[indexColor]} rounded-full`}
      />
      <p className="text-ellipsis line-clamp-2">{text}</p>
      <p className="text-sm font-medium mt-1 text-descText">{subText}</p>
    </li>
  );
}
