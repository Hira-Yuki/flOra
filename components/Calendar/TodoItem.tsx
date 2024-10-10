import CustomCheckbox from '@components/CustomElements/CustomCheckbox';

export default function TodoItem({ todoList }) {
  if (todoList.length === 0) return '등록된 할일이 없습니다.';

  return (
    <>
      {todoList.map((todo) => (
        <li key={todo.todoId}>
          <CustomCheckbox
            text={todo.title}
            initialValue={todo.isComplete}
            line1={todo.title.length >= 20}
          />
        </li>
      ))}
    </>
  );
}
