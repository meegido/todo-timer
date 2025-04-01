import React from 'react';
import styles from './edit-textarea.module.css';
import { Todo } from '../../../todo.types';

interface EditTextareaProps {
  todo: Todo;
  editTodoTitle: string;
  setEditTodoTitle: React.Dispatch<string>;
  setIsEditMode: React.Dispatch<boolean>;
  onSave: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const EditTextarea: React.FC<EditTextareaProps> = ({
  todo,
  editTodoTitle,
  setEditTodoTitle,
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
        value={editTodoTitle || todo.title}
        onChange={(event) => {
          setEditTodoTitle(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onSave();
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            setIsEditMode(false);
            setEditTodoTitle(todo.title);
          }
        }}
        onBlur={(event) => {
          event.preventDefault();
          setIsEditMode(false);
          setEditTodoTitle(todo.title);
        }}
      />
    </div>
  );
};

export default EditTextarea;
