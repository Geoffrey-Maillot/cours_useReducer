import { useDispatchTodoContext } from './todoContext';

export function Input() {
  const setTodo = useDispatchTodoContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const title = formData.get('title') as string;
        if (title.trim().length > 0) {
          setTodo({
            type: 'add',
            payload: { title },
          });
          form.reset();
        }
      }}
    >
      <input
        type="text"
        name="title"
        className="w-full rounded px-1 py-2 border-2 border-slate-700 my-4"
      />
    </form>
  );
}
