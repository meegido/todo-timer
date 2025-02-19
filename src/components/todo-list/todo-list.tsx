import React from 'react';
import styles from './todo-list.module.css';
import { Todo } from '../../todo-timer';

interface TodoListProps {
  todo: Todo;
  inputEditValue: string;
  setInputEditValue: React.Dispatch<React.SetStateAction<string>>;
}
const TodoList = ({
  todo,
  inputEditValue,
  setInputEditValue,
}: TodoListProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

  return (
    <article className={styles.card__wrapper}>
      {isEditMode ? (
        <fieldset>
          <label className={styles.visually__hidden} htmlFor="todo">
            Edit todo
          </label>
          <input
            type="text"
            name="todo"
            id="todo"
            aria-label="edit-input"
            placeholder={todo.title}
            value={inputEditValue || todo.title}
            onChange={(event) => {
              if (todo.id) {
                setInputEditValue(event.target.value);
              }
            }}
          />
        </fieldset>
      ) : (
        <p key={todo.id} aria-label="todo" onClick={() => setIsEditMode(true)}>
          {todo.title}
        </p>
      )}
    </article>
  );
};

export default TodoList;
