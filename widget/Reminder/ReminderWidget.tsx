import WidgetWrapper from '@components/widgetElements/small/WidgetWrapper';

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
            <li className="text-lg leading-none pl-2 relative">
              {/* 가상 요소를 이용한 둥근 선 */}
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexRed rounded-full" />
              <p className="text-ellipsis line-clamp-2">
                Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor
                Lorem ipsum dolor sit sit
              </p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexRed rounded-full" />
              <p className="text-ellipsis line-clamp-2">
                Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor
              </p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexYellow rounded-full" />
              <p className="text-ellipsis line-clamp-2">
                Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor
                sit Lorem ipsum dolor Lorem ipsum dolor sit sitLorem ipsum dolor
              </p>
              <p className="text-sm font-medium mt-1 text-descText">
                10:00-11:00
              </p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexCyan rounded-full" />
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexLavender rounded-full" />
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexGreen rounded-full" />
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexGreen rounded-full" />
              <p>Lorem ipsum dolor sit</p>
            </li>
            <li className="text-lg leading-none pl-2 relative">
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-indexGreen rounded-full" />
              <p>Lorem ipsum dolor sit</p>
            </li>
          </ul>
        </div>
      </div>
    </WidgetWrapper>
  );
}
