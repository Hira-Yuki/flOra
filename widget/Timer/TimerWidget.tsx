import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';
import WidgetHeader from '@components/widgetElements/WidgetHeader';

export default function TimerWidget() {
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <WidgetHeader title={'타이머'} />
      </div>
    </WidgetWrapper>
  );
}
