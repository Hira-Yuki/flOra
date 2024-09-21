'use client';
import CustomCheckbox from '@components/CustomElements/CustomCheckbox';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';

export default function LargeTaskManagerWidget({ title }) {
  return (
    <WidgetWrapper>
      <div>
        <WidgetHeader title={title} />
      </div>
      <div className="flex flex-col gap-2 overflow-scroll max-h-[550px]">
        <CustomCheckbox indexColor={'indexRed'} text="해야할 것 레드" />
        <CustomCheckbox indexColor={'indexGreen'} text="해야할 것 그린" />
        <CustomCheckbox indexColor={'indexYellow'} text="해야할 것 엘로" />
        <CustomCheckbox indexColor={'indexCyan'} text="해야할 것 시안" />
        <CustomCheckbox indexColor={'indexLavender'} text="해야할 것 라벤더" />
      </div>
    </WidgetWrapper>
  );
}
