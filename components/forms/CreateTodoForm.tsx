import CreateTodoTypeSelector from '@components/CustomElements/CreateTodoTypeSelector';
import CustomColorSelector from '@components/CustomElements/CustomColorSelector';
import CustomDatePicker from '@components/CustomElements/CustomDatePicker';
import CustomRoutineSelector from '@components/CustomElements/CustomRoutineSelector';
import ModalFormTitleInput from '@components/CustomElements/ModalFormTitleInput';
import ModalSaveButton from '@components/CustomElements/ModalSaveButton';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

type IndexColor =
  | 'indexRed'
  | 'indexGreen'
  | 'indexYellow'
  | 'indexCyan'
  | 'indexLavender';

type createType = 'studyRoutine' | 'study' | 'lifeRoutine' | 'life';

interface TodoFormType {
  title: string;
  createType: createType;
  start: Date | string;
  end: Date | string;
  indexColor: IndexColor;
  memo: string;
  day_of_week: string[];
}

export default function CreateTodoForm() {
  const [state, setState] = useState<TodoFormType>({
    title: '',
    createType: 'studyRoutine',
    start: dayjs().second(0).toDate(),
    end: dayjs().second(0).toDate(),
    indexColor: 'indexRed',
    memo: '',
    day_of_week: [],
  });

  // 폼에 담을 때는 isRoutine도 담아야햄
  const isRoutine =
    state.createType === 'studyRoutine' || state.createType === 'lifeRoutine';

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
    const formData = {
      isRoutine,
      title: state.title,
      startDateTime: state.start,
      endDateTime: state.end,
      indexColor: state.indexColor,
      description: state.memo,
      isComplete: false,
      day_of_week: state.day_of_week,
    };

    try {
      // 서버 호출 ~~~~
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center">
        <ModalFormTitleInput
          value={state.title}
          onChange={(e) => stateHandler('title', e.target.value)}
        />
      </div>
      <hr />
      <div className="mt-6 flex flex-col gap-3">
        <CreateTodoTypeSelector
          value={state.createType}
          onChange={(value) => stateHandler('createType', value)}
        />
      </div>
      <hr />
      <div className="mt-6 flex flex-col gap-3">
        <CustomDatePicker
          isAllDay={false}
          value={state.start}
          startDate={state.start}
          endDate={state.end}
          onChange={(value) => stateHandler('start', value)}
          type="start"
          label={'시작 날짜'}
        />
        <CustomDatePicker
          isAllDay={false}
          value={state.end}
          onChange={(value) => stateHandler('end', value)}
          type="end"
          startDate={state.start}
          endDate={state.end}
          label={'종료 날짜'}
        />
        {/* 루틴일 때 ?????  */}
        {isRoutine && (
          <CustomRoutineSelector
            label={'반복'}
            day_of_week={state.day_of_week}
            onChange={(value) => stateHandler('day_of_week', value)}
          />
        )}
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
