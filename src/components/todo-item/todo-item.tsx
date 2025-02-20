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

  const handleSave = () => {
    onUpdateTodo(todo.id, { ...todo, title: editTodoValue });
    setIsEditMode(false);
  };

  return (
    <form>
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
          />
        </fieldset>
      ) : (
        <p key={todo.id} aria-label="todo" onClick={() => setIsEditMode(true)}>
          {todo.title}
        </p>
      )}
    </form>
  );
  // return (
  //   <div>
  //     <fieldset>
  //       <label className={styles.visually__hidden} htmlFor="check-todo">
  //         Check todo
  //       </label>
  //       <input
  //         type="radio"
  //         name="check-todo"
  //         id="check-todo"
  //         value="check-todo"
  //         checked={false}
  //       />
  //     </fieldset>
  //     <fieldset className={`${styles.card}`}>
  //       <label className={styles.visually__hidden} htmlFor="todo-text">
  //         Create a todo
  //       </label>
  //       <textarea
  //         name="todo-text"
  //         id="todo-text"
  //         value={inputTodoValue}
  //         onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
  //           setInputTodoValue(event.target.value)
  //         }
  //         onKeyDown={(event) => {
  //           if (event.key === 'Enter') {
  //             event.preventDefault();
  //             handleCreateTodo();
  //           }
  //         }}
  //       />
  //       <p tabIndex={0} aria-label={'todo'} onClick={() => setIsEditMode(true)}>
  //         {todo.title}
  //       </p>
  //     </fieldset>
  //   </div>
  // );
};

export default TodoItem;
