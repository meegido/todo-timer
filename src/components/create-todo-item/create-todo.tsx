import React from 'react';
import styles from './create-todo-item.module.css';
import { Plus } from 'lucide-react';

interface CreateTodoItemProps {
  inputTodoValue: string;
  setInputTodoValue: React.Dispatch<React.SetStateAction<string>>;
  handleCreateTodo: () => void;
}

const CreateTodoItem = ({
  inputTodoValue,
  setInputTodoValue,
  handleCreateTodo,
}: CreateTodoItemProps) => {
  return (
    <section className={styles.todo__input__wrapper}>
      <fieldset className={`${styles.todo__input}`}>
        <label className={styles.visually__hidden} htmlFor="todo-text">
          Create a todo
        </label>
        <Plus />
        <input
          type="text"
          name="todo-text"
          id="todo-text"
          placeholder="add a task"
          value={inputTodoValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputTodoValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleCreateTodo();
            }
          }}
        />
      </fieldset>
    </section>
  );
};

export default CreateTodoItem;
