import React from 'react';
import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';
import EditTextarea from './edit-textarea/edit-textarea';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

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
          <EditTextarea
            todo={todo}
            editTodoValue={editTodoValue}
            setEditTodoValue={setEditTodoValue}
            setIsEditMode={setIsEditMode}
            onSave={handleSave}
            inputRef={inputRef}
          />
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
      <section className={styles.controls__wrapper}></section>
    </div>
  );
};

export default TodoItem;
