import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';

export default function ReminderWidget() {
  return (
    <WidgetWrapper>
      <div className="flex h-full">
        <div className="pr-9 h-full">
          <div>
            <span className="text-white font-bold text-xs md:text-sm">SEP</span>
          </div>
          <div>
            <span className="text-5xl text-black font-bold">22</span>
          </div>
          <div>
            <span className="text-orange-700 font-bold">SUNDAY</span>
          </div>
        </div>
        <div className="flex-1 pt-6">
          <ul className="flex flex-col gap-4 overflow-scroll max-h-56 pr-1 font-semibold">
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
              <p className="text-sm font-medium mt-1">10:00-11:00</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 border-l-2 border-gray-400">
              <p>Lorem ipsum dolor sit</p>
            </li>
          </ul>
        </div>
      </div>
    </WidgetWrapper>
  );
}
