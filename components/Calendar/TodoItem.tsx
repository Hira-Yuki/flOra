import CustomCheckbox from '@components/CustomElements/CustomCheckbox';

export default function TodoItem({ todoList, toggleTodoListItem }) {
  if (todoList.length === 0) return <div>등록된 할일이 없습니다.</div>;

  return (
    <>
      {todoList.map((todo) => (
        <li key={todo.todoId}>
          <CustomCheckbox
            text={todo.title}
            indexColor={todo.indexColor}
            initialValue={todo.isCompleted}
            onClick={(newState: boolean) =>
              toggleTodoListItem(todo.todoId, newState)
            }
          />
        </li>
      ))}
    </>
  );
}
