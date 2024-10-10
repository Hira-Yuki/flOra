import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { useToggle } from '@hooks';
import { todoAPI } from '@lib/api/todo';
import dayjs from 'dayjs';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

import SwitchButton from './SwitchButton';
import TodoItem from './TodoItem';

export default function TodoList({ title, subTitle }) {
  const isRoutine = useToggle(true);
  const [todoList, setTodoList] = useState([]);
  const [isPending, startTransition] = useTransition();
  // 이전 todoList 상태를 저장할 ref
  const previousTodoList = useRef([]);

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
      previousTodoList.current = data; // 가져온 데이터로 이전 상태를 설정
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      // 에러 발생시 빈 배열로 초기화
      setTodoList([]);
    }
  };

  useEffect(() => {
    startTransition(() => {
      getTodoList();
    });
  }, [isRoutine.value]);

  const toggleTodoListItem = (id, newStatus: boolean) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.todoId === id ? { ...item, isCompleted: newStatus } : item,
      ),
    );
  };

  const updateTodoList = async () => {
    // 이전 상태와 현재 상태를 비교하여 변경된 항목 필터링
    const changedTodos = todoList.filter((currentTodo) => {
      const previousTodo = previousTodoList.current.find(
        (prevTodo) => prevTodo.todoId === currentTodo.todoId,
      );
      return (
        previousTodo && previousTodo.isCompleted !== currentTodo.isCompleted
      );
    });

    // 변경된 항목이 없으면 서버 업데이트를 건너뜀
    if (changedTodos.length === 0) return;
    try {
      const updateTodos = changedTodos.map((todo) => ({
        todoId: todo.todoId,
        isCompleted: !todo.isCompleted,
      }));
      await todoAPI.updateTodoList(updateTodos);
      toast.success('투두 리스트 동기화 완료');
      previousTodoList.current = todoList;
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 1초마다 상태를 체크하고 업데이트하는 함수 설정
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTodoList();
    }, 1000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(intervalId);
    };
  }, [todoList]); // todoList가 변경될 때마다 타이머를 설정

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
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <TodoItem
              toggleTodoListItem={toggleTodoListItem}
              todoList={todoList}
            />
          )}
        </ul>
      </div>
      {isPending && <div className="absolute bottom-2 left-2">Loading...</div>}
    </WidgetWrapper>
  );
}
