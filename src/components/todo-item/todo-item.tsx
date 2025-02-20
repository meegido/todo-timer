import React from 'react';
import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef && inputRef.current && isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleSave = () => {
    onUpdateTodo(todo.id, { ...todo, title: editTodoValue });
    setIsEditMode(false);
  };

  return (
    <form className={styles.card}>
      <fieldset className={styles.check__wrapper}>
        <label htmlFor="done" className={styles.visually__hidden}>
          Check todo as done
        </label>
        <input
          type="radio"
          name="done"
          id="done"
          aria-label="check-done"
          value="done"
          checked={false}
        />
      </fieldset>
      {isEditMode ? (
        <fieldset className={styles.input__wrapper}>
          <label className={styles.visually__hidden} htmlFor="todo">
            Edit todo
          </label>
          <input
            ref={inputRef}
            type="text"
            name="todo"
            id="todo"
            aria-label="edit-input"
            placeholder={todo.title}
            value={editTodoValue || todo.title}
            onChange={(event) => {
              setEditTodoValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSave();
              }
            }}
            onBlur={() => setIsEditMode}
          />
        </fieldset>
      ) : (
        <p key={todo.id} aria-label="todo" onClick={() => setIsEditMode(true)}>
          {todo.title}
        </p>
      )}
    </form>
  );
};

export default TodoItem;
