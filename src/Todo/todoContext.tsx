import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

type Type = 'remove' | 'add' | 'changeStatus';

export interface TodoActions {
  type: Type;
  payload: Partial<Todo>;
}

const initialTaches: Array<Todo> = [
  {
    id: 10,
    title: 'Ma première tâche',
    done: false,
  },
  {
    id: 1,
    title: 'Ma seconde tâche',
    done: false,
  },
  {
    id: 2,
    title: 'Encore une tâche',
    done: false,
  },
  {
    id: 3,
    title: "j'en peu plus",
    done: false,
  },
  {
    id: 4,
    title: 'Enfin la binouse!',
    done: true,
  },
];

const generateId = (todos: Array<Todo>): number => {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
};

const TodoContext = createContext<Array<Todo>>({} as Array<Todo>);
const dispatchTodoContext = createContext<Dispatch<TodoActions>>(() => {});

interface Props extends PropsWithChildren {}

const stateReducer = (state: Array<Todo>, action: TodoActions) => {
  switch (action.type) {
    case 'add':
      const todo = {
        ...action.payload,
        id: generateId(state),
        done: false,
      } as Todo;
      return [todo, ...state];

    case 'remove':
      if (!action.payload.id) {
        throw new Error('You must provide an id');
      }
      const filteredTodos = state.filter(
        (todo) => todo.id !== action.payload.id
      );
      return [...filteredTodos];

    case 'changeStatus':
      if (!action.payload.id) {
        throw new Error('You must provide an id');
      }
      const copieTodos = [...state];
      let todoToChange = copieTodos.find(
        (todo) => todo.id === action.payload.id
      ) as Todo;
      todoToChange = { ...todoToChange, done: !todoToChange.done };
      const indexTodoToChange = copieTodos.findIndex(
        (todo) => todo.id === todoToChange.id
      );
      copieTodos.splice(indexTodoToChange, 1, todoToChange);

      return copieTodos;

    default:
      throw new Error('Use a valid type of action');
  }
};

const TodoProvider = ({ children }: Props) => {
  const [todos, todoDispatch] = useReducer(stateReducer, initialTaches);

  return (
    <TodoContext.Provider value={todos}>
      <dispatchTodoContext.Provider value={todoDispatch}>
        {children}
      </dispatchTodoContext.Provider>
    </TodoContext.Provider>
  );
};

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos was used outside of his provider');
  }

  return context;
};

const useDispatchTodoContext = () => {
  const context = useContext(dispatchTodoContext);

  if (!context) {
    throw new Error('useSetTodo was used outside of his provider');
  }

  return context;
};

export { TodoProvider, useTodoContext, useDispatchTodoContext };
