export default function Header(props) {
  const { label }: { label: string } = props;

  if (label.length === 3) {
    const dayShort = label.charAt(0);
    return (
      <div className="text-center font-medium text-lg text-mainText">
        {dayShort}
      </div>
    );
  }

  const [date, day] = label.split(' ');
  // const slicedDay = day.charAt(0);

  return (
    <div className="text-center font-semibold text-md text-mainText">
      <div>
        {day} {date}
      </div>
    </div>
  );
}
