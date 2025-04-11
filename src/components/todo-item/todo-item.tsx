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
      variant: variant,
    });

    setIsEditMode(false);
  };

  const handleVariantUpdate = (newVariant: TodoVariant) => {
    setVariant(newVariant);
    onUpdateTodo({
      title: editTodoTitle,
      variant: newVariant,
    });
  };

  const handleCountdown = (mode: 'play' | 'pause') => {
    if (variant === TodoVariant.DONE) {
      return;
    }

    if (mode === 'play') {
      onSetActiveTodo();
      onHandlePlay();
      handleVariantUpdate(TodoVariant.ON_GOING);
    }

    if (mode === 'pause') {
      onHandlePause();
      handleVariantUpdate(TodoVariant.PAUSED);
    }
  };

  const variantClass = `${styles.card} ${styles[variant]}`;
  const controlButtonClass = isTodoHover ? '' : styles.hiddenControlButton;
  const doneClass =
    variant === TodoVariant.DONE ? styles.marked : styles.todo__title;

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
            variant={variant}
            onToggle={handleVariantUpdate}
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
              className={doneClass}
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
            className={controlButtonClass}
            onHandleCountdown={() => handleCountdown('pause')}
          />
        ) : (
          <ControlButton
            label="Start the countdown on todo"
            icon={Play}
            className={controlButtonClass}
            onHandleCountdown={() => handleCountdown('play')}
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
