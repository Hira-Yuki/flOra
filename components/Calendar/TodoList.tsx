import CustomCheckbox from '@components/CustomCheckbox';
import { useToggle } from '@hooks';

import SwitchButton from './SwitchButton';

export default function TodoList({ title, subTitle }) {
  const isRoutine = useToggle(true);
  return (
    <div className="w-full h-full bg-floraBeige rounded-2xl p-8">
      <SwitchButton
        isSwitch={isRoutine.value}
        label1={'루틴'}
        label2={'비루틴'}
        func1={isRoutine.setTrue}
        func2={isRoutine.setFalse}
      />
      <div className="w-full py-2">
        <h3 className="text-4xl font-bold w-full text-center">{title}</h3>
        <h4 className="text-2xl font-medium w-full text-center">{subTitle}</h4>
      </div>
      <div className="my-6">
        <ul className="flex flex-col gap-6 overflow-scroll">
          <li>
            <CustomCheckbox
              line1={false}
              text="두줄 이상이면 이렇게 나올거에요... 하핳.... 하하핳...으하하핳....."
            />
          </li>
          <li>
            <CustomCheckbox />
          </li>
          <li>
            <CustomCheckbox />
          </li>
        </ul>
      </div>
    </div>
  );
}
