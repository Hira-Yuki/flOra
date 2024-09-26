import CreateTodoTypeSelector from '@components/CustomElements/CreateTodoTypeSelector';
import ModalFormTitleInput from '@components/CustomElements/ModalFormTitleInput';
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
  isAllDay: boolean;
  start: Date;
  end: Date;
  indexColor: IndexColor;
  memo: string;
}

export default function CreateTodoForm() {
  const [state, setState] = useState<TodoFormType>({
    title: '',
    createType: 'studyRoutine',
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
      <div className="flex justify-center items-center">
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
    </form>
  );
}
