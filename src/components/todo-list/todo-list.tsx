import styles from './todo-list.module.css';
import TodoItem from '../todo-item/todo-item';
import React from 'react';
import { Todo } from '../../client/in-memory-todo-client';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  isCountdownActive: boolean;
}

const TodoList = ({
  todos,
  onUpdateTodo,
  onHandlePlay,
  onHandlePause,
  isCountdownActive,
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
        />
      ))}
    </section>
  );
};

export default TodoList;
