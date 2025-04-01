import React from 'react';
import styles from './create-todo-item.module.css';
import { Plus } from 'lucide-react';
import { SupabaseTodoClient } from '../../client/supabase-todo-client';
import { Todo } from '../../todo.types';

interface CreateTodoItemProps {
  todoClient: SupabaseTodoClient;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const CreateTodoItem = ({ todoClient, setTodos }: CreateTodoItemProps) => {
  const [inputCreateValue, setInputCreateValue] = React.useState<string>('');

  const createTodo = React.useCallback(async () => {
    try {
      const newTodo = await todoClient.createTodo(inputCreateValue);
      setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
      setInputCreateValue('');
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : 'Unexpected error occurred';
      console.error(errorMsg);
    }
  }, [todoClient, inputCreateValue, setInputCreateValue, setTodos]);

  return (
    <section className={styles.todo__input__wrapper}>
      <fieldset className={`${styles.todo__input}`}>
        <label className={styles.visually__hidden} htmlFor="todo-text">
          Create a todo
        </label>
        <Plus />
        <textarea
          name="todo-text"
          id="todo-text"
          aria-label="create-input"
          placeholder="Add a task"
          maxLength={200}
          value={inputCreateValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputCreateValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void createTodo();
            }
          }}
        />
      </fieldset>
    </section>
  );
};

export default CreateTodoItem;
