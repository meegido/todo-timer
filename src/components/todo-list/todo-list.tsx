import styles from './todo-list.module.css';
import TodoItem from '../todo-item/todo-item';
import React from 'react';
import { SupabaseTodoClient } from '../../client/supabase-todo-client';
import { Todo, UpdatedTodo } from '../../todo.types';
import Toast from '../../shared/toast/toast';

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
  const [showToast, setShowToast] = React.useState<boolean>(false);

  console.log(todos, 'Todos in todo list');

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === 'Escape') {
      setShowToast(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  React.useEffect(() => {
    setStatus(TodoStatus.Loading);
    void (async () => {
      try {
        const retrievedTodos = await todoClient.retrieveAll();
        setTodos(retrievedTodos);
        setStatus(TodoStatus.Success);
        console.log(retrievedTodos, 'retrieved todos');
      } catch (error) {
        console.log(error);
        setStatus(TodoStatus.Error);
      }
    })();
  }, [todoClient, setTodos]);

  const handleUpdateTodo = async (id: string, updates: UpdatedTodo) => {
    try {
      console.log(updates, 'the updates sending to the fetch');
      const editedTodo = await todoClient.editTodo(id, { ...updates });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, ...updates } : todo
        );
      });
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unexpected error occurred';
      console.error(errorMsg);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    console.log(`Delted todo with id: ${id}`);
    try {
      await todoClient.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setShowToast(true);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unexpected error occurred';
      console.log(errorMsg);
    }
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
              onUpdateTodo={(updatedTodo: UpdatedTodo) => {
                const updates = {
                  title: updatedTodo.title,
                  variant: updatedTodo.variant,
                };
                console.log(updatedTodo, 'en lio');

                void handleUpdateTodo(todo.id, updates);
              }}
              onDeleteTodo={() => void handleDeleteTodo(todo.id)}
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
      {showToast && (
        <section className={styles.toast__wrapper}>
          <Toast
            onDismiss={() => setShowToast(false)}
            onPressEscape={() =>
              handleKeyDown({ code: 'Escape' } as KeyboardEvent)
            }
          />
        </section>
      )}
    </>
  );
};

export default TodoList;
