import CustomBorderItem from '@components/CustomElements/CustomBorderItem';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';

export default function ReminderWidget() {
  return (
    <WidgetWrapper>
      <div className="flex h-full">
        <div className="pr-9 h-full min-w-32">
          <div>
            <h3 className="text-floraOlive font-bold text-xs md:text-sm">
              SEP
            </h3>
          </div>
          <div>
            <span className="text-5xl text-black font-bold">22</span>
          </div>
          <div>
            <span className="text-mainText font-bold">Wednesday</span>
          </div>
        </div>
        <div className="flex-1 pt-6">
          <ul className="flex flex-col gap-4 overflow-scroll max-h-56 pr-1 font-semibold">
            <CustomBorderItem
              indexColor={'indexRed'}
              text={'sample'}
              subText={'10:00-11:00'}
            />
            <CustomBorderItem indexColor={'indexYellow'} text={'sample2'} />
          </ul>
        </div>
      </div>
    </WidgetWrapper>
  );
}
