import React from 'react';
import CreateTodoItem from './components/create-todo-item/create-todo';

export interface Todo {
  id: string;
  title: string;
}

const data = [
  { title: 'Read the article about Testing Library', id: 'i234234' },
  { title: 'UI Benchmark', id: '3w4hkljsd' },
];

function TodoTimer() {
  const [todos, setTodos] = React.useState<Todo[]>(data);
  const [inputTodoValue, setInputTodoValue] = React.useState<string>('');

  const handleCreateTodo = () => {
    setTodos((prevTodos: Todo[]) => [
      ...prevTodos,
      { id: Date.now().toString(), title: inputTodoValue },
    ]);
    setInputTodoValue('');
  };

  return (
    <main>
      <h1>Todo Timer</h1>
      <CreateTodoItem
        inputTodoValue={inputTodoValue}
        setInputTodoValue={setInputTodoValue}
        handleCreateTodo={handleCreateTodo}
      />
      {todos.map((todo) => (
        <p key={todo.id} aria-label="todo">
          {todo.title}
        </p>
      ))}
    </main>
  );
}

export default TodoTimer;
