import React from 'react';
import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';
import TimerControls from '../../shared/timer-controls/timer-controls';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

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
    <div className={styles.card}>
      <section className={styles.content__wrapper}>
        <div className={styles.check__wrapper}>
          <label
            htmlFor={`done-${todo.id}`}
            className={styles.visually__hidden}
          >
            Check or uncheck the todo as done
          </label>
          <input
            type="checkbox"
            name="done"
            id={`done-${todo.id}`}
            value="done"
            aria-label="Check or uncheck the todo as done"
            checked={isTodoDone}
            onChange={() => setIsTodoDone(!isTodoDone)}
          />
        </div>

        {isEditMode ? (
          <div className={styles.input__wrapper}>
            <label className={styles.visually__hidden} htmlFor="todo">
              Edit your todo title
            </label>
            <textarea
              ref={inputRef}
              name="todo"
              id="todo"
              aria-label="Edit your todo title"
              placeholder={todo.title}
              maxLength={200}
              rows={1}
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
              onBlur={(event) => {
                event.preventDefault();
                setIsEditMode(false);
                setEditTodoValue(todo.title);
              }}
            />
          </div>
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
      </section>
      <section className={styles.controls__wrapper}>
        <TimerControls />
      </section>
    </div>
  );
};

export default TodoItem;
