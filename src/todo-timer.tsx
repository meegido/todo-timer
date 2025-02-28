import React from 'react';
import CreateTodoItem from './components/create-todo-item/create-todo';
import TodoList from './components/todo-list/todo-list';
import styles from './todo-timer.module.css';
import Header from './shared/header/header';
import Timer from './components/timer/timer';
import TimerProvider from './providers/timer-provider';
export interface Todo {
  id: string;
  title: string;
}

const data = [
  { title: 'Read the article about Testing Library', id: 'i234234' },
  { title: 'UI Benchmark', id: '3w4hkljsd' },
  { title: 'Split the tasks into small slices', id: '3549349348' },
  { title: 'Understand container queries', id: 'i2¡3453244234' },
  { title: 'Understand mix-max widht', id: '30909w4hkljsd' },
  { title: `Don't forget to do a proper slicing`, id: '35493493432238' },
];

function TodoTimer() {
  const [todos, setTodos] = React.useState<Todo[]>(data);
  const [inputCreateValue, setInputCreateValue] = React.useState<string>('');

  const handleCreateTodo = () => {
    setTodos((prevTodos: Todo[]) => [
      ...prevTodos,
      { id: Date.now().toString(), title: inputCreateValue },
    ]);
    setInputCreateValue('');
  };

  const handleUpdateTodo = (id: string, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <main>
      <Header />
      <TimerProvider>
        <section className={styles.todo__timer__wrapper}>
          <CreateTodoItem
            inputCreateValue={inputCreateValue}
            setInputCreateValue={setInputCreateValue}
            handleCreateTodo={handleCreateTodo}
          />
          <Timer />
        </section>

        <section className={styles.list__wrapper}>
          {todos.map((todo) => (
            <TodoList
              key={todo.id}
              todo={todo}
              onUpdateTodo={handleUpdateTodo}
            />
          ))}
        </section>
      </TimerProvider>
    </main>
  );
}

export default TodoTimer;
