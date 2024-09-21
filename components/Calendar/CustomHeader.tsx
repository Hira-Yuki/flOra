import ArrowLeft from '@components/icons/ArrowLeft';
import ArrowRight from '@components/icons/ArrowRight';

import SwitchButton from './SwitchButton';

export default function CustomHeader({ calendarApi }) {
  const handlePrev = () => calendarApi.prev(); // 이전 달로 이동
  const handleNext = () => calendarApi.next(); // 다음 달로 이동
  const handleToday = () => calendarApi.today(); // 오늘 날짜로 이동
  const handleViewChange = (view) => calendarApi.changeView(view); // 뷰 변경
  console.log(calendarApi);
  return (
    <div className="my-4 flex flex-col">
      <SwitchButton
        isSwitch={false}
        isCalendar={true}
        label1={'월'}
        label2={'주'}
        func1={() => handleViewChange('dayGridMonth')}
        func2={() => handleViewChange('timeGridWeek')}
        goToday={handleToday}
      />
      <div className="flex justify-center gap-4 text-4xl items-center">
        <button type="button" className="w-8" onClick={handlePrev}>
          <ArrowLeft className={'w-8 h-8 text-mainText'} />
        </button>
        <h3 className="font-bold">....... title</h3>
        <button type="button" className="w-8" onClick={handleNext}>
          <ArrowRight className={'w-8 h-8 text-mainText'} />
        </button>
      </div>
    </div>
  );
}
