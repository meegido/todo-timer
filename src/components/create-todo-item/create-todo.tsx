import React from 'react';
import styles from './create-todo-item.module.css';
import { Plus } from 'lucide-react';

interface CreateTodoItemProps {
  inputCreateValue: string;
  setInputCreateValue: React.Dispatch<React.SetStateAction<string>>;
  handleCreateTodo: () => void;
}

const CreateTodoItem = ({
  inputCreateValue,
  setInputCreateValue,
  handleCreateTodo,
}: CreateTodoItemProps) => {
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
              handleCreateTodo();
            }
          }}
        />
      </fieldset>
    </section>
  );
};

export default CreateTodoItem;
