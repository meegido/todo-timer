import styles from './todo-list.module.css';
import { Todo } from '../../todo-timer';
import TodoItem from '../todo-item/todo-item';
import TimerContext from '../../context/timer-context';
import React from 'react';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}

const TodoList = ({ todos, onUpdateTodo }: TodoListProps) => {
  const [activeTodo, setActiveTodo] = React.useState<string>('0');

  const timerContext = React.useContext(TimerContext);
  if (!timerContext) {
    throw new Error('Timer must be used within a TimerProvider');
  }
  const {
    handlePlayCountdown,
    handlePauseCountdown,
    isCountdownActive,
    isCountdownPaused,
  } = timerContext;

  return (
    <section className={styles.list__wrapper}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onHandlePlay={handlePlayCountdown}
          onHandlePause={handlePauseCountdown}
          isActiveTodo={activeTodo === todo.id}
          onSetActiveTodo={() => {
            setActiveTodo(todo.id);
          }}
          isCountdownActive={isCountdownActive}
          isCountdownPaused={isCountdownPaused}
        />
      ))}
    </section>
  );
};

export default TodoList;
