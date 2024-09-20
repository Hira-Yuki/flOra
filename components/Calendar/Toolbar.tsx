import ArrowLeft from '@components/icons/ArrowLeft';
import ArrowRight from '@components/icons/ArrowRight';
import dayjs from 'dayjs';

import SwitchButton from './SwitchButton';

export default function Toolbar(toolbar) {
  if (toolbar.view !== 'month' && toolbar.view !== 'week') {
    return null;
  }

  const isViewMonth = toolbar.view === 'month';

  const goPrev = () => {
    toolbar.onNavigate('PREV');
  };

  const goNext = () => {
    toolbar.onNavigate('NEXT');
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
        goToday={() => toolbar.onNavigate('TODAY')}
      />
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={goPrev}>
          <ArrowLeft className={'w-8 h-8 text-mainText'} />
        </button>
        <h3 className="font-bold">{label}</h3>
        <button type="button" className="w-8" onClick={goNext}>
          <ArrowRight className={'w-8 h-8 text-mainText'} />
        </button>
      </div>
    </div>
  );
}
