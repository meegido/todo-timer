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

enum TodoStatus {
  Idle = 'idle',
  Error = 'error',
  Success = 'success',
  Loading = 'loading',
}

const TodoList = ({
  todoClient,
  onHandlePlay,
  onHandlePause,
  isCountdownActive,
}: TodoListProps) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = React.useState<string>('0');
  const [status, setStatus] = React.useState<TodoStatus>(TodoStatus.Idle);

  React.useEffect(() => {
    void (async () => {
      try {
        const retrievedTodos = await todoClient.retrieveAll();
        setTodos(retrievedTodos);
        setStatus(TodoStatus.Success);
      } catch (error) {
        console.log(error);
        setStatus(TodoStatus.Error);
      }
    })();
  }, [todoClient]);

  const handleUpdateTodo = (id: string, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  return (
    <section className={styles.list__wrapper}>
      {status === TodoStatus.Success ? (
        todos.map((todo) => (
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
        ))
      ) : (
        <p>Error fetching your Todos</p>
      )}
    </section>
  );
};

export default TodoList;
