import dayjs from 'dayjs';

export default function Toolbar(toolbar) {
  const isViewMonth = toolbar.view === 'month';
  const currentDate = toolbar.date;

  console.log(toolbar);

  const prevMonth = () => {
    console.log('Prev Month Clicked');
    const newDate = dayjs(currentDate).subtract(1, 'month').toDate();
    toolbar.onNavigate(null, newDate);
  };

  const nextMonth = () => {
    console.log('Next Month Clicked');
    const newDate = dayjs(currentDate).add(1, 'month').toDate();
    toolbar.onNavigate(null, newDate);
  };

  return (
    <div className="my-4 flex flex-col">
      <div className="flex-1 flex justify-end">
        <div className="relative bg-white rounded-badge w-[130px] text-mainText overflow-hidden">
          <button
            className={`w-[70px] px-4 py-2 h-full rounded-badge ${isViewMonth ? 'bg-floraYellow' : ''}`}
            onClick={() => toolbar.onView('month')}
          >
            월
          </button>
          <button
            className={`absolute right-0 w-[70px] px-4 py-2 rounded-badge ${isViewMonth ? '' : 'bg-floraYellow'}`}
            onClick={() => toolbar.onView('week')}
          >
            주
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={prevMonth}>
          &lt;
        </button>
        <div className="font-bold">
          {dayjs(toolbar.date).format('MMM YYYY').toUpperCase()}
        </div>
        <button type="button" className="w-8" onClick={nextMonth}>
          &gt;
        </button>
      </div>
    </div>
  );
}
