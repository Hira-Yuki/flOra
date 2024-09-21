import {
  BigCancelIcon,
  ClockIcon,
  EventIcon,
  GreenAddIcon,
  PenIcon,
  TodoIcon,
} from '@components/icons';
import { useToggle } from '@hooks';

export default function FloatButtons() {
  const addMenuToggle = useToggle();

  return (
    <div className="absolute bottom-6 right-6 cursor-pointer">
      <div className="relative flex flex-col gap-6">
        {addMenuToggle.value && (
          <div className="bg-transparent text-lg flex flex-col gap-2 absolute bottom-20 -left-16">
            <ul className="bg-white px-4 py-2 rounded-xl flex flex-col gap-6">
              <li>
                <button type="button" className="flex gap-2 hover:opacity-70">
                  <EventIcon />
                  <span>이벤트</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex gap-2 hover:opacity-70">
                  <TodoIcon />
                  <span>투두</span>
                </button>
              </li>
              <li>
                <button type="button" className="flex gap-2 hover:opacity-70">
                  <ClockIcon />
                  <span>디데이</span>
                </button>
              </li>
            </ul>
            <div className="bg-white px-4 py-1 rounded-xl">
              <button type="button" className="flex gap-2 hover:opacity-70">
                <PenIcon />
                <span>일기</span>
              </button>
            </div>
          </div>
        )}
        <div
          className={`transition-transform duration-300 ease-in-out hover:opacity-75 ${addMenuToggle.value ? 'rotate-45' : '-rotate-90'}`}
          onClick={addMenuToggle.toggleValue}
        >
          {addMenuToggle.value ? (
            <BigCancelIcon />
          ) : (
            <div>
              <GreenAddIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
