import dayjs from 'dayjs';

import SwitchButton from './SwitchButton';

export default function Toolbar(toolbar) {
  if (toolbar.view !== 'month' && toolbar.view !== 'week') {
    return null;
  }

  const isViewMonth = toolbar.view === 'month';
  const currentDate = toolbar.date;

  const goPrev = () => {
    const newDate = dayjs(currentDate).subtract(1, toolbar.view).toDate();
    toolbar.onNavigate(null, newDate);
  };

  const goNext = () => {
    const newDate = dayjs(currentDate).add(1, toolbar.view).toDate();
    toolbar.onNavigate(null, newDate);
  };

  const label = dayjs(toolbar.date).format('MMM YYYY').toUpperCase();

  return (
    <div className="my-4 flex flex-col">
      <SwitchButton
        isSwitch={isViewMonth}
        isCalendar={true}
        label1={'월'}
        label2={'주'}
        func1={() => toolbar.onView('month')}
        func2={() => toolbar.onView('week')}
      />
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={goPrev}>
          &lt;
        </button>
        <h3 className="font-bold">{label}</h3>
        <button type="button" className="w-8" onClick={goNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}
