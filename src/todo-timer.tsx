import React from 'react';
import CreateTodoItem from './components/create-todo-item/create-todo';
import TodoList from './components/todo-list/todo-list';
import styles from './todo-timer.module.css';
import Header from './shared/header/header';
import Timer from './components/timer/timer';
import TimerContext from './context/timer-context';
import { Todo, TodoClient } from './todo-client';

interface TodoTimerProps {
  todoClient: TodoClient;
}

function TodoTimer({ todoClient }: TodoTimerProps) {
  const [todos, setTodos] = React.useState<Todo[]>(todoClient.retrieve());
  const [inputCreateValue, setInputCreateValue] = React.useState<string>('');

  const timerContext = React.useContext(TimerContext);
  if (!timerContext) {
    throw new Error('Timer must be used within a TimerProvider');
  }
  const {
    timeLeft,
    handlePlayCountdown,
    handlePauseCountdown,
    handleResetCountdown,
    isCountdownActive,
  } = timerContext;

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
      <section className={styles.todo__timer__wrapper}>
        <CreateTodoItem
          inputCreateValue={inputCreateValue}
          setInputCreateValue={setInputCreateValue}
          handleCreateTodo={handleCreateTodo}
        />
        <Timer
          timeLeft={timeLeft}
          onHandlePlay={handlePlayCountdown}
          onHandlePause={handlePauseCountdown}
          onHandleReset={handleResetCountdown}
        />
      </section>
      <TodoList
        todos={todos}
        onUpdateTodo={handleUpdateTodo}
        onHandlePlay={handlePlayCountdown}
        onHandlePause={handlePauseCountdown}
        isCountdownActive={isCountdownActive}
      />
    </main>
  );
}

export default TodoTimer;
