import CustomColorSelector from '@components/CustomElements/CustomColorSelector';
import CustomDatePicker from '@components/CustomElements/CustomDatePicker';
import CustomModal from '@components/CustomElements/CustomModal';
import DDayCheckBox from '@components/CustomElements/DDayCheckBox';
import ModalSaveButton from '@components/CustomElements/ModalSaveButton';
import ToggleSwitch from '@components/CustomElements/ToggleSwitch';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

import EventToggleSwitch from './EventToggleSwitch';

// // 플러그인 적용
// dayjs.extend(utc);
// dayjs.extend(timezone);

// dayjs.tz.setDefault('Asia/Seoul'); // 기본 타임존을 서울로 설정

interface EventCreateModalProps {
  modalController: {
    value: boolean;
    toggleValue: () => void;
    setTrue: () => void;
    setFalse: () => void;
  };
}

export default function EventCreateModal({
  modalController,
}: EventCreateModalProps) {
  const [state, setState] = useState({
    isEvent: 'event',
    title: '',
    isDDay: false,
    isAllDay: false,
    start: dayjs().second(0).toDate(),
    end: dayjs().second(0).toDate(),
    indexColor: 'indexRed',
    memo: '',
  });

  console.log(state);

  const stateHandler = (key, value) => {
    setState((prev) => {
      const startTime = dayjs(key === 'start' ? value : prev.start);
      const endTime = dayjs(key === 'end' ? value : prev.end);

      // end 시간이 start 시간보다 이전일 경우
      if (key === 'end' && endTime.isBefore(startTime)) {
        const newEndTime = startTime.add(30, 'minute'); // 30분 추가
        toast.warn('종료시간이 시작시간보다 이전이에요.');
        return { ...prev, end: newEndTime.toDate() };
      }

      // start 시간이 변경되었을 때, end가 start보다 이전이면 end를 start + 30분으로 설정
      if (key === 'start' && endTime.isBefore(startTime)) {
        const newEndTime = startTime.add(30, 'minute'); // 30분 추가
        toast.warn('시작시간이 종료시간보다 뒤에요.');
        return { ...prev, start: value, end: newEndTime.toDate() };
      }

      // 기본 상태 업데이트
      return { ...prev, [key]: value };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // 뭔가 한다....

    try {
      // 서버 호출 ~~~~
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomModal modalController={modalController}>
      {/* 이벤트/투두 변경 버튼 */}
      <EventToggleSwitch
        selectedOption={state.isEvent}
        onChange={(value) => stateHandler('isEvent', value)}
      />
      <form onSubmit={onSubmit}>
        <div className="flex justify-center items-center">
          <input
            value={state.title}
            type="text"
            placeholder="제목 입력"
            className="px-3 mt-6 mb-4 text-[32px] font-bold focus:outline-none"
            onChange={(e) => stateHandler('title', e.target.value)}
          />
          <DDayCheckBox
            checked={state.isDDay}
            onChange={(checked) => stateHandler('isDDay', checked)}
            label={'디데이로 등록'}
          />
        </div>
        <hr />
        <div className="mt-6 flex flex-col gap-3 ">
          <ToggleSwitch
            checked={state.isAllDay}
            onChange={(checked) => stateHandler('isAllDay', checked)}
            label={'하루종일'}
          />
          <CustomDatePicker
            value={state.start}
            startDate={state.start}
            state={state}
            onChange={(value) => stateHandler('start', value)}
            type="start"
            label={'시작'}
          />
          <CustomDatePicker
            value={state.end}
            state={state}
            onChange={(value) => stateHandler('end', value)}
            type="end"
            startDate={state.start}
            label={'종료'}
          />
          <CustomColorSelector label={'인덱스'} />
        </div>
        <hr />
        <div>
          {/* 리미트가 필요할까 ???? */}
          <input
            type="text"
            placeholder="메모"
            className="block outline-none p-3 w-full"
          />
          <div className="flex flex-row-reverse">
            <ModalSaveButton onClick={onSubmit} />
          </div>
        </div>
      </form>
    </CustomModal>
  );
}
