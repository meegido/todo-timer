import React from 'react';
import CreateTodoItem from './components/create-todo-item/create-todo';
import TodoList from './components/todo-list/todo-list';
import styles from './todo-timer.module.css';
import Header from './shared/header/header';
import Timer from './components/timer/timer';
import TimerContext from './context/timer-context';
import { Todo, TodoClient } from './todo.types';

interface TodoTimerProps {
  todoClient: TodoClient;
}

function TodoTimer({ todoClient }: TodoTimerProps) {
  const [todos, setTodos] = React.useState<Todo[]>([]);

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

  return (
    <main>
      <Header />
      <section className={styles.todo__timer__wrapper}>
        <CreateTodoItem todoClient={todoClient} setTodos={setTodos} />
        <Timer
          timeLeft={timeLeft}
          onHandlePlay={handlePlayCountdown}
          onHandlePause={handlePauseCountdown}
          onHandleReset={handleResetCountdown}
        />
      </section>
      <TodoList
        todoClient={todoClient}
        todos={todos}
        setTodos={setTodos}
        onHandlePlay={handlePlayCountdown}
        onHandlePause={handlePauseCountdown}
        isCountdownActive={isCountdownActive}
      />
    </main>
  );
}

export default TodoTimer;
