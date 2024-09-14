import WidgetWrapper from '@components/widgetElements/mini/WidgetWrapper';
import WidgetHeader from '@components/widgetElements/WidgetHeader';

export default function AccumulatedTimeWidget() {
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <WidgetHeader title={'오늘 누적시간'} />
      </div>
    </WidgetWrapper>
  );
}
