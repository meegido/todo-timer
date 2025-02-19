import React from 'react';
import CreateTodoItem from './components/create-todo-item/create-todo';
import TodoList from './components/todo-list/todo-list';
import styles from './todo-timer.module.css';
export interface Todo {
  id: string;
  title: string;
}

const data = [
  { title: 'Read the article about Testing Library', id: 'i234234' },
  { title: 'UI Benchmark', id: '3w4hkljsd' },
  { title: 'Split the tasks into small slices', id: '3549349348' },
];

function TodoTimer() {
  const [todos, setTodos] = React.useState<Todo[]>(data);
  const [inputCreateValue, setInputCreateValue] = React.useState<string>('');
  const [inputEditValue, setInputEditValue] = React.useState<string>('');

  const handleCreateTodo = () => {
    setTodos((prevTodos: Todo[]) => [
      ...prevTodos,
      { id: Date.now().toString(), title: inputCreateValue },
    ]);
    setInputCreateValue('');
  };

  return (
    <main>
      <h1>Todo Timer</h1>
      <CreateTodoItem
        inputCreateValue={inputCreateValue}
        setInputCreateValue={setInputCreateValue}
        handleCreateTodo={handleCreateTodo}
      />
      <section className={styles.list__wrapper}>
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            todo={todo}
            inputEditValue={inputEditValue}
            setInputEditValue={setInputEditValue}
          />
        ))}
      </section>
    </main>
  );
}

export default TodoTimer;
