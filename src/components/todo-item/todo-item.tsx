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
  onDeleteTodo: () => void;
  onHandlePlay: () => void;
  onHandlePause: () => void;
  onSetActiveTodo: () => void;
  isActiveTodo: boolean;
  isCountdownActive: boolean;
}

const TodoItem = ({
  todo,
  onUpdateTodo,
  onDeleteTodo,
  onHandlePlay,
  onHandlePause,
  onSetActiveTodo,
  isActiveTodo,
  isCountdownActive,
}: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoTitle, setEditTodoTitle] = React.useState<string>(todo.title);
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const [variant, setVariant] = React.useState<TodoVariant>(todo.variant);
  const [isTodoHover, setIsTodoHover] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (inputRef && inputRef.current && isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleTitleUpdate = () => {
    onUpdateTodo({
      title: editTodoTitle,
      completed: isTodoDone,
      variant: variant,
    });

    setIsEditMode(false);
    console.log(editTodoTitle, isTodoDone, variant, 'en update title');
  };

  const handleDoneUpdate = () => {
    if (isCountdownActive) {
      return;
    }

    const newDone = !isTodoDone;
    setIsTodoDone(newDone);

    const updatedVariant = newDone ? TodoVariant.DONE : variant;
    setVariant(updatedVariant);

    onUpdateTodo({
      title: editTodoTitle,
      completed: newDone,
      variant: updatedVariant,
    });

    console.log(editTodoTitle, isTodoDone, variant, 'en done update');
  };

  const variantClass = `${styles.card} ${isTodoDone ? styles.done : styles[variant]}`;

  return (
    <article
      className={variantClass}
      aria-label={`Todo item ${todo.id}`}
      onMouseEnter={() => setIsTodoHover(true)}
      onMouseLeave={() => setIsTodoHover(false)}
    >
      <div className={styles.task__wrapper}>
        <section className={styles.task__content}>
          <CheckboxDone
            todo={todo}
            isTodoDone={isTodoDone}
            setIsTodoDone={handleDoneUpdate}
          />

          {isEditMode ? (
            <EditTextarea
              todo={todo}
              editTodoTitle={editTodoTitle}
              setEditTodoTitle={setEditTodoTitle}
              setIsEditMode={setIsEditMode}
              onSave={handleTitleUpdate}
              inputRef={inputRef}
            />
          ) : (
            <p
              className={isTodoDone ? styles.marked : styles.todo__title}
              key={todo.id}
              aria-label="Todo title"
              onClick={() => setIsEditMode(true)}
            >
              {editTodoTitle}
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
              setVariant(TodoVariant.PAUSED);
              onUpdateTodo({
                title: editTodoTitle,
                completed: isTodoDone,
                variant: TodoVariant.PAUSED,
              });
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
              setVariant(TodoVariant.ON_GOING);
              onUpdateTodo({
                title: editTodoTitle,
                completed: isTodoDone,
                variant: TodoVariant.ON_GOING,
              });
            }}
          />
        )}
      </div>
      <div className={styles.options__wrapper}>
        <section className={styles.options}>
          <button
            className={styles.delete__button}
            aria-label={'delete todo'}
            onClick={onDeleteTodo}
          >
            <Trash size={16} />
          </button>
        </section>
      </div>
    </article>
  );
};

export default TodoItem;
