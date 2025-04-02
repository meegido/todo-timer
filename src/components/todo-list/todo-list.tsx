import styles from './todo-list.module.css';
import TodoItem from '../todo-item/todo-item';
import React from 'react';
import { SupabaseTodoClient } from '../../client/supabase-todo-client';
import { Todo, TodoVariant } from '../../todo.types';

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

  const handleUpdateTodo = async (
    id: string,
    updates: {
      title: string;
      completed: boolean;
      variant: TodoVariant;
    }
  ) => {
    try {
      console.log(updates, 'the updates sending to the fetch');
      const editedTodo = await todoClient.editTodo(id, { ...updates });
      setTodos((prevTodos) => {
        console.log(updates, 'updates');
        return prevTodos.map((todo) => (todo.id === id ? editedTodo : todo));
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
              onUpdateTodo={(updatedTodo: Partial<Todo>) => {
                const updates = {
                  title: updatedTodo.title!,
                  completed: updatedTodo.completed!,
                  variant: updatedTodo.variant!,
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
    </>
  );
};

export default TodoList;
