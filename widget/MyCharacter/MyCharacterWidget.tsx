import WidgetWrapper from '@components/widgetElements/mini/WidgetWrapper';
import WidgetHeader from '@components/widgetElements/WidgetHeader';

export default function MyCharacterWidget() {
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center mb-1">
        <WidgetHeader title={'내 캐릭터'} />
      </div>
    </WidgetWrapper>
  );
}
