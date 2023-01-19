import { useTodoContext } from './todoContext';
import { Todo } from './todo';
import { Input } from './input';

export function TodoList() {
  const todos = useTodoContext();

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-center">Todolist</h1>
        <Input />
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
