'use client';
import TodoItem from '@components/Calendar/TodoItem';
import WidgetHeader from '@components/widgetElements/WidgetHeader';
import WidgetWrapper from '@components/widgetElements/WidgetWrapper';
import { todoAPI } from '@lib/api/todo';
import dayjs from 'dayjs';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

export default function LargeTaskManagerWidget({ title }) {
  const [todoList, setTodoList] = useState([]);
  const todoType =
    title.split(' ')[0] === '스터디' ? 'TODO_STUDY' : 'TODO_LIFE';
  const isRoutine = false;
  const [isPending, startTransition] = useTransition();
  const previousTodoList = useRef([]);

  const getTodoList = async () => {
    const date = dayjs().format('YYYY-MM-DD');
    try {
      // 호출
      const { data } = await todoAPI.getTodoList({
        isRoutine,
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
    startTransition(() => getTodoList());
  }, []);

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

  console.log(todoList);
  return (
    <WidgetWrapper>
      <div>
        <WidgetHeader title={title} />
      </div>
      <div className="flex flex-col gap-2 max-h-[550px]">
        <ul className="flex flex-col gap-6 overflow-scroll">
          {isPending && <div className="text-mainText">Loading...</div>}
          {todoList.length === 0 ? (
            <div className="text-mainText">설정된 할 일이 없어요.</div>
          ) : (
            <TodoItem
              toggleTodoListItem={toggleTodoListItem}
              todoList={todoList}
            />
          )}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
