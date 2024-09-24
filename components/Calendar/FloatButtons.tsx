import CustomModal from '@components/CustomElements/CustomModal';
import ToggleSwitch from '@components/CustomElements/ToggleSwitch';
import {
  BigCancelIcon,
  ClockIcon,
  EventIcon,
  GreenAddIcon,
  PenIcon,
  TodoIcon,
} from '@components/icons';
import { useToggle } from '@hooks';

export default function FloatButtons({ modalController }) {
  const addMenuToggle = useToggle();

  const callModal = () => {
    modalController.setTrue();
    addMenuToggle.setFalse();

    // 동적으로 모달 내용 변경...
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
                  onClick={() => callModal()}
                >
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
          {addMenuToggle.value ? <BigCancelIcon /> : <GreenAddIcon />}
        </div>
      </div>
      {/*  */}
      <CustomModal modalController={modalController}>
        {/* 이벤트/투두 변경 버튼 */}
        <div className="flex gap-3 text-mainText text-lg font-medium">
          <button
            type="button"
            className="w-24 h-9 border border-floraYellow bg-floraYellow rounded-badge"
          >
            이벤트
          </button>
          <button
            type="button"
            className="w-24 h-9 border border-objectGray rounded-badge"
          >
            투두
          </button>
        </div>
        <form>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="제목 입력"
              className="px-2 mt-6 mb-4 text-[32px] font-bold focus:outline-none"
            />
            <div className="flex gap-1 justify-center items-center">
              <label htmlFor="is_set_todo" className="cursor-pointer">
                디데이로 등록
              </label>
              <input id="is_set_todo" type="checkbox" className="hidden peer" />
              <label
                htmlFor="is_set_todo"
                className="relative w-4 h-4 border border-mainText peer-checked:before:content-['✓'] peer-checked:before:absolute before:-top-1.5 before:text-mainText cursor-pointer"
              />
            </div>
          </div>
          <hr />
          <div className="mt-6 flex flex-col">
            <ToggleSwitch label={'하루종일'} />
            시작, 종료, 인덱스 컬러
          </div>
          <hr />
          <div>
            <div>메모</div>
            <button type="button">저장</button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
