import styles from './todo-list.module.css';
import { Todo } from '../../todo-timer';
import TodoItem from '../todo-item/todo-item';
import React from 'react';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  isCountdownActive: boolean;
  isCountdownPaused: boolean;
}

const TodoList = ({
  todos,
  onUpdateTodo,
  onHandlePlay,
  onHandlePause,
  isCountdownActive,
  isCountdownPaused,
}: TodoListProps) => {
  const [activeTodo, setActiveTodo] = React.useState<string>('0');

  return (
    <section className={styles.list__wrapper}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onHandlePlay={onHandlePlay}
          onHandlePause={onHandlePause}
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
