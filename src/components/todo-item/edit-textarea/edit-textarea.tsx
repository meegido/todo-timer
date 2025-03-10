import React from 'react';
import styles from './edit-textarea.module.css';
import { Todo } from '../../../todo-client';

interface EditTextareaProps {
  todo: Todo;
  editTodoValue: string;
  setEditTodoValue: React.Dispatch<string>;
  setIsEditMode: React.Dispatch<boolean>;
  onSave: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const EditTextarea: React.FC<EditTextareaProps> = ({
  todo,
  editTodoValue,
  setEditTodoValue,
  setIsEditMode,
  onSave,
  inputRef,
}: EditTextareaProps) => {
  return (
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
            onSave();
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
  );
};

export default EditTextarea;
