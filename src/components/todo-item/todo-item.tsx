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
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
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
          Check or uncheck the todo as done
        </label>
        <input
          type="checkbox"
          name="done"
          id="done"
          value="done"
          aria-label="Check or uncheck the todo as done"
          checked={isTodoDone}
          onChange={() => setIsTodoDone(!isTodoDone)}
        />
      </fieldset>
      {isEditMode ? (
        <fieldset className={styles.input__wrapper}>
          <label className={styles.visually__hidden} htmlFor="todo">
            Edit your todo title
          </label>
          <input
            ref={inputRef}
            type="text"
            name="todo"
            id="todo"
            aria-label="Edit your todo title"
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

              if (event.key === 'Escape') {
                event.preventDefault();
                setIsEditMode(false);
                setEditTodoValue(todo.title);
              }
            }}
          />
        </fieldset>
      ) : (
        <p
          className={isTodoDone ? styles.done : styles.todo__title}
          key={todo.id}
          aria-label="Todo title"
          onClick={() => setIsEditMode(true)}
        >
          {todo.title}
        </p>
      )}
    </form>
  );
};

export default TodoItem;
