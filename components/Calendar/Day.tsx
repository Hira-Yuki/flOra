import { getToday } from 'util/getToday';

const today = getToday();

export default function Day(props) {
  const { label } = props;

  const isToday = label === today;

  return (
    <div className="pt-1">
      <span
        className={`rounded-full p-1 font-medium ${isToday && 'bg-floraYellow'}`}
        onClick={props.onDrillDown}
      >
        {label}
      </span>
    </div>
  );
}
