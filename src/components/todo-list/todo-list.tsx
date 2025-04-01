import styles from './todo-list.module.css';
import TodoItem from '../todo-item/todo-item';
import React from 'react';
import { SupabaseTodoClient } from '../../client/supabase-todo-client';
import { Todo } from '../../todo.types';

interface TodoListProps {
  todoClient: SupabaseTodoClient;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
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
  setTodos,
  todos,
  onHandlePlay,
  onHandlePause,
  isCountdownActive,
}: TodoListProps) => {
  const [activeTodo, setActiveTodo] = React.useState<string>('0');
  const [status, setStatus] = React.useState<TodoStatus>(TodoStatus.Idle);

  React.useEffect(() => {
    setStatus(TodoStatus.Loading);
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
  }, [todoClient, setTodos]);

  const handleUpdateTodo = (id: string, updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  if (status === TodoStatus.Loading) {
    return <p>Loading...</p>;
  }

  if (status === TodoStatus.Error) {
    return <p>Error fetching your Todos</p>;
  }

  return (
    <>
      {status === TodoStatus.Success && (
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
          ))}{' '}
        </section>
      )}
    </>
  );
};

export default TodoList;
