import CustomColorSelector from '@components/CustomElements/CustomColorSelector';
import CustomDatePicker from '@components/CustomElements/CustomDatePicker';
import DDayCheckBox from '@components/CustomElements/DDayCheckBox';
import ModalFormTitleInput from '@components/CustomElements/ModalFormTitleInput';
import ModalSaveButton from '@components/CustomElements/ModalSaveButton';
import ToggleSwitch from '@components/CustomElements/ToggleSwitch';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

type IndexColor =
  | 'indexRed'
  | 'indexGreen'
  | 'indexYellow'
  | 'indexCyan'
  | 'indexLavender';

interface TodoEventType {
  title: string;
  isDDay: boolean;
  isAllDay: boolean;
  start: Date;
  end: Date;
  indexColor: IndexColor;
  memo: string;
}

export default function CreateEventForm() {
  const [state, setState] = useState<TodoEventType>({
    title: '',
    isDDay: false,
    isAllDay: false,
    start: dayjs().second(0).toDate(),
    end: dayjs().second(0).toDate(),
    indexColor: 'indexRed',
    memo: '',
  });

  const stateHandler = (key, value) => {
    setState((prev) => {
      const startTime = dayjs(key === 'start' ? value : prev.start);
      const endTime = dayjs(key === 'end' ? value : prev.end);

      // end 시간이 start 시간보다 이전일 경우
      if (key === 'end' && endTime.isBefore(startTime)) {
        const newEndTime = startTime.add(1, 'minute'); // 1분 추가
        toast.warn('종료시간을 시작시간보다 과거로 설정할 수 없어요.');
        return { ...prev, end: newEndTime.toDate() };
      }

      // start 시간이 변경되었을 때, end가 start보다 이전이면 end를 start + 1분으로 설정
      if (key === 'start' && endTime.isBefore(startTime)) {
        const newEndTime = startTime.add(1, 'minute'); // 1분 추가
        toast.warn('시작시간을 종료시간보다 미래로 설정할 수 없어요.');
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
    <form onSubmit={onSubmit}>
      <div className="flex justify-center items-center w-full">
        <ModalFormTitleInput
          value={state.title}
          onChange={(e) => stateHandler('title', e.target.value)}
        />
        <DDayCheckBox
          checked={state.isDDay}
          onChange={(checked) => stateHandler('isDDay', checked)}
          label={'디데이로 등록'}
        />
      </div>
      <hr />
      <div className="mt-6 flex flex-col gap-3">
        <ToggleSwitch
          checked={state.isAllDay}
          onChange={(checked) => stateHandler('isAllDay', checked)}
          label={'하루종일'}
        />
        <CustomDatePicker
          value={state.start}
          startDate={state.start}
          state={state}
          endDate={state.end}
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
          endDate={state.end}
          label={'종료'}
        />
        <CustomColorSelector
          indexColor={state.indexColor}
          onChange={(value) => stateHandler('indexColor', value)}
          label={'인덱스'}
        />
      </div>
      <hr />
      <div>
        <input
          value={state.memo}
          onChange={(e) => stateHandler('memo', e.target.value)}
          type="text"
          placeholder="메모"
          className="block outline-none p-3 w-full"
        />
        <div className="flex flex-row-reverse">
          <ModalSaveButton onClick={onSubmit} />
        </div>
      </div>
    </form>
  );
}
