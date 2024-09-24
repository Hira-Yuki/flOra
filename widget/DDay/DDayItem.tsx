import dayjs from 'dayjs';

export default function DDayItem({ items, today }) {
  return (
    <>
      {items.map((item, index) => {
        const eventDate = dayjs(item.d_day);
        const dDayCount = eventDate.diff(today, 'day');
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center content-center gap-2 min-w-full"
          >
            <p className="text-white font-bold text-4xl">D-{dDayCount}</p>
            <p className="text-lg text-floraWhite font-semibold">
              {item.title}
            </p>
            <p className="text-sm text-objectGray font-semibold">
              {eventDate.format('YYYY-MM-DD')}
            </p>
          </div>
        );
      })}
    </>
  );
}
