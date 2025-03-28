import styles from './todo-list.module.css';
import TodoItem from '../todo-item/todo-item';
import React from 'react';
import { Todo, TodoClient } from '../../client/in-memory-todo-client';

interface TodoListProps {
  todoClient: TodoClient;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  isCountdownActive: boolean;
}

const TodoList = ({
  todoClient,
  onHandlePlay,
  onHandlePause,
  isCountdownActive,
}: TodoListProps) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = React.useState<string>('0');

  React.useEffect(() => {
    const retrieveTodos = async () => {
      try {
        const retrievedTodos = await todoClient.retrieveAll();
        setTodos(retrievedTodos);
      } catch (error) {
        console.log(`Error retrieving todos:`, error);
      }
    };

    retrieveTodos().catch((error) =>
      console.error(`Error 2 retrieving todos:`, error)
    );
  }, [todoClient]);

  const handleUpdateTodo = (id: string, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <section className={styles.list__wrapper}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={handleUpdateTodo}
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
