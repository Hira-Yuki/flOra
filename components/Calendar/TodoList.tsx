import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { useToggle } from '@hooks';
import { todoAPI } from '@lib/api/todo';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import SwitchButton from './SwitchButton';
import TodoItem from './TodoItem';

export default function TodoList({ title, subTitle }) {
  const isRoutine = useToggle(true);
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const getTodoList = async () => {
      const todoType = subTitle === 'Study' ? 'TODO_STUDY' : 'TODO_LIFE';
      const date = dayjs().format('YYYY-MM-DD');
      try {
        // 호출
        const { data } = await todoAPI.getTodoList({
          isRoutine: isRoutine.value,
          todoType,
          date,
        });
        setTodoList(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTodoList();
  }, [isRoutine.value]);

  return (
    <WidgetWrapper>
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
          <TodoItem todoList={todoList} />
        </ul>
      </div>
    </WidgetWrapper>
  );
}
