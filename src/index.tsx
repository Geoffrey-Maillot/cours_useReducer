import React from 'react';
import ReactDOM from 'react-dom/client';
import { Count } from './Count/Count';
import './styles/tailwind.css';
import { TodoProvider } from './Todo/todoContext';
import { TodoList } from './Todo/TodoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoProvider>
      <TodoList />
      <Count />
    </TodoProvider>
  </React.StrictMode>
);
