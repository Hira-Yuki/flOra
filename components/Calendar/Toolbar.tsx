import dayjs from 'dayjs';

export default function Toolbar(toolbar) {
  if (toolbar.view !== 'month' && toolbar.view !== 'week') {
    return null;
  }

  const isViewMonth = toolbar.view === 'month';
  const currentDate = toolbar.date;

  const goPrev = () => {
    const newDate = dayjs(currentDate).subtract(1, toolbar.view).toDate();
    toolbar.onNavigate('PREV', newDate);
  };

  const goNext = () => {
    const newDate = dayjs(currentDate).add(1, toolbar.view).toDate();
    toolbar.onNavigate('NEXT', newDate);
  };

  const label = dayjs(toolbar.date).format('MMM YYYY').toUpperCase();

  return (
    <div className="my-4 flex flex-col">
      <div className="flex-1 flex justify-end">
        <div className="relative bg-white rounded-badge w-[130px] text-mainText overflow-hidden">
          <button
            className={`w-[70px] px-4 py-2 h-full rounded-badge ${isViewMonth && 'bg-floraYellow'}`}
            onClick={() => toolbar.onView('month')}
          >
            월
          </button>
          <button
            className={`absolute right-0 w-[70px] px-4 py-2 rounded-badge ${!isViewMonth && 'bg-floraYellow'}`}
            onClick={() => toolbar.onView('week')}
          >
            주
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={goPrev}>
          &lt;
        </button>
        <div className="font-bold">{label}</div>
        <button type="button" className="w-8" onClick={goNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}
