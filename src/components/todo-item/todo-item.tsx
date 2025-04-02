import React from 'react';
import styles from './todo-item.module.css';
import EditTextarea from './edit-textarea/edit-textarea';
import CheckboxDone from './checkbox-done/checkbox-done';
import { Play, Pause, Trash } from 'lucide-react';
import ControlButton from '../../shared/control-button/control-button';
import { Todo, TodoVariant } from '../../todo.types';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Partial<Todo>) => void;
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
  const [editTodoTitle, setEditTodoTitle] = React.useState<string>('');
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
    console.log(editTodoTitle, isTodoDone, todoVariant, 'en item');

    onUpdateTodo({
      title: editTodoTitle,
      completed: isTodoDone,
      variant: todoVariant,
    });
    setIsEditMode(false);
  };

  return (
    <article
      className={`${styles.card} ${styles[todoVariant]}`}
      aria-label={`Todo item ${todo.id}`}
      onMouseEnter={() => setIsTodoHover(true)}
      onMouseLeave={() => setIsTodoHover(false)}
    >
      <div className={styles.task__wrapper}>
        <section className={styles.task__content}>
          <CheckboxDone
            todo={todo}
            isTodoDone={isTodoDone}
            setIsTodoDone={() => {
              if (isCountdownActive) {
                return;
              }
              setIsTodoDone(!isTodoDone);
              setTodoVariant(
                isTodoDone ? TodoVariant.DONE : TodoVariant.INACTIVE
              );
            }}
          />

          {isEditMode ? (
            <EditTextarea
              todo={todo}
              editTodoTitle={editTodoTitle}
              setEditTodoTitle={setEditTodoTitle}
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
      </div>
      <div className={styles.task__options}>
        <button className={styles.delete__button}>
          <Trash size={16} />
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
