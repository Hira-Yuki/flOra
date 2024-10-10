export default function DDayItem({ items }) {
  if (items.length === 0)
    return (
      <div className="flex flex-col justify-center items-center content-center gap-2 min-w-full">
        <p className="text-white font-bold text-4xl">D-DAY</p>
        <p className="text-lg text-floraWhite font-semibold">
          설정된 디데이 없음
        </p>
        <p className="text-sm text-objectGray font-semibold">
          지금 바로 설정해보세요.
        </p>
      </div>
    );

  return (
    <>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center content-center gap-2 min-w-full"
          >
            <p className="text-white font-bold text-4xl">
              D-{item.remain === 0 ? 'DAY' : item.remain}
            </p>
            <p className="text-lg text-floraWhite font-semibold">
              {item.title}
            </p>
            <p className="text-sm text-objectGray font-semibold">
              {item.startDate}
            </p>
          </div>
        );
      })}
    </>
  );
}
