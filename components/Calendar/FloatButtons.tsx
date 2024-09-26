import {
  BigCancelIcon,
  ClockIcon,
  EventIcon,
  GreenAddIcon,
  PenIcon,
  TodoIcon,
} from '@components/icons';
import EventCreateModal from '@components/ModalContents/EventCreateModal';
import { useToggle } from '@hooks';
import { useState } from 'react';

export default function FloatButtons({ modalController }) {
  const addMenuToggle = useToggle();
  const [options, setOPtions] = useState<'event' | 'todo'>();
  const callModal = (option) => {
    modalController.setTrue();
    addMenuToggle.setFalse();

    // 동적으로 모달 내용 변경...
    setOPtions(option);
  };

  return (
    <div className="absolute bottom-6 right-6 cursor-pointer">
      <div className="relative flex flex-col gap-6">
        {addMenuToggle.value && (
          <div className="bg-transparent text-lg flex flex-col gap-2 absolute bottom-20 -left-16">
            <ul className="bg-white px-4 py-2 rounded-xl flex flex-col gap-6">
              <li>
                <button
                  type="button"
                  className="flex gap-2 hover:opacity-70"
                  onClick={() => callModal('event')}
                >
                  <EventIcon />
                  <span>이벤트</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex gap-2 hover:opacity-70"
                  onClick={() => callModal('todo')}
                >
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
          {addMenuToggle.value ? <BigCancelIcon /> : <GreenAddIcon />}
        </div>
      </div>
      {/* <------------------> */}
      {modalController.value && (
        <EventCreateModal options={options} modalController={modalController} />
      )}
    </div>
  );
}
