import type { Todo as TypeTodo } from './todoContext';
import { useDispatchTodoContext } from './todoContext';

export function Todo({ id, title, done }: TypeTodo) {
  const setTodo = useDispatchTodoContext();

  return (
    <li
      key={id}
      className=" text-lg flex justify-start items-center rounded px-2 py-4 gap-1"
    >
      <input type="checkbox" checked={done} readOnly />
      <div>{title}</div>
      <div className="ml-auto">
        <button onClick={() => setTodo({ type: 'remove', payload: { id } })}>
          ❌
        </button>
        <button
          onClick={() => setTodo({ type: 'changeStatus', payload: { id } })}
        >
          ✔
        </button>
      </div>
    </li>
  );
}
