import React from 'react';
import { Todo, TodoVariant } from '../../todo-client';
import styles from './todo-item.module.css';
import EditTextarea from './edit-textarea/edit-textarea';
import CheckboxDone from './checkbox-done/checkbox-done';
import { Play, Pause } from 'lucide-react';
import ControlButton from '../../shared/control-button/control-button';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  onSetActiveTodo: () => void;
  isActiveTodo: boolean;
  isCountdownActive: boolean;
}

const TodoItem = ({
  todo,
  onUpdateTodo,
  onHandlePlay,
  onHandlePause,
  onSetActiveTodo,
  isActiveTodo,
  isCountdownActive,
}: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const [isTodoHover, setIsTodoHover] = React.useState<boolean>(false);
  const [todoVariant, setTodoVariant] = React.useState<TodoVariant>(
    TodoVariant.INACTIVE
  );

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
    <article
      className={`${styles.card} ${styles[todoVariant]}`}
      aria-label={`Todo item ${todo.id}`}
      onMouseEnter={() => setIsTodoHover(true)}
      onMouseLeave={() => setIsTodoHover(false)}
    >
      <section className={styles.content__wrapper}>
        <CheckboxDone
          todo={todo}
          isTodoDone={isTodoDone}
          setIsTodoDone={() => {
            if (isCountdownActive) {
              return;
            }
            setIsTodoDone(!isTodoDone);
            setTodoVariant(
              isTodoDone ? TodoVariant.INACTIVE : TodoVariant.DONE
            );
          }}
        />

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
            className={isTodoDone ? styles.marked : styles.todo__title}
            key={todo.id}
            aria-label="Todo title"
            onClick={() => setIsEditMode(true)}
          >
            {todo.title}
          </p>
        )}
      </section>
      {isActiveTodo && isCountdownActive ? (
        <ControlButton
          label="Pause the countdown on todo"
          icon={Pause}
          isTodoHover={isTodoDone ? !isTodoHover : isTodoHover}
          onHandleCountdown={() => {
            onHandlePause();
            setTodoVariant(TodoVariant.PAUSED);
          }}
        />
      ) : (
        <ControlButton
          label="Start the countdown on todo"
          icon={Play}
          isTodoHover={isTodoDone ? !isTodoHover : isTodoHover}
          onHandleCountdown={() => {
            if (isTodoDone) {
              return;
            }
            onSetActiveTodo();
            onHandlePlay();
            setTodoVariant(TodoVariant.ON_GOING);
          }}
        />
      )}
    </article>
  );
};

export default TodoItem;
