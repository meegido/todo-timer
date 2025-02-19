import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';

interface TodoItemProps {
  handleCreateTodo: () => void;
  inputTodoValue: string;
  setInputTodoValue: (value: string) => void;
  setIsEditMode: (value: boolean) => void;
  todo: Todo;
}

const TodoItem = ({
  handleCreateTodo,
  inputTodoValue,
  setInputTodoValue,
  setIsEditMode,
  todo,
}: TodoItemProps) => {
  return (
    <div>
      <fieldset>
        <label className={styles.visually__hidden} htmlFor="check-todo">
          Check todo
        </label>
        <input
          type="radio"
          name="check-todo"
          id="check-todo"
          value="check-todo"
          checked={false}
        />
      </fieldset>
      <fieldset className={`${styles.card}`}>
        <label className={styles.visually__hidden} htmlFor="todo-text">
          Create a todo
        </label>
        <textarea
          name="todo-text"
          id="todo-text"
          value={inputTodoValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputTodoValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleCreateTodo();
            }
          }}
        />
        <p tabIndex={0} aria-label={'todo'} onClick={() => setIsEditMode(true)}>
          {todo.title}
        </p>
      </fieldset>
    </div>
  );
};

export default TodoItem;
