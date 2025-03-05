import styles from './todo-list.module.css';
import { Todo } from '../../todo-timer';
import TodoItem from '../todo-item/todo-item';
import TimerContext from '../../context/timer-context';
import React from 'react';

interface TodoListProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}
const TodoList = ({ todo, onUpdateTodo }: TodoListProps) => {
  const timerContext = React.useContext(TimerContext);
  if (!timerContext) {
    throw new Error('Timer must be used within a TimerProvider');
  }
  const { handlePlayCountdown } = timerContext;

  return (
    <article className={styles.card__wrapper}>
      <TodoItem
        todo={todo}
        onUpdateTodo={onUpdateTodo}
        onHandlePlay={handlePlayCountdown}
      />
    </article>
  );
};

export default TodoList;
