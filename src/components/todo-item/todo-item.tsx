import React from 'react';
import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';
import EditTextarea from './edit-textarea/edit-textarea';
import CheckboxDone from './checkbox-done/checkbox-done';
import PlayButton from '../../shared/timer-controls/play-button';
import TimerContext from '../../context/timer-context';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}

const TodoItem = ({ todo, onUpdateTodo }: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const timerContext = React.useContext(TimerContext);
  if (!timerContext) {
    throw new Error('Timer must be used within a TimerProvider');
  }
  const { handlePlayCountdown } = timerContext;

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
        <CheckboxDone
          todo={todo}
          isTodoDone={isTodoDone}
          setIsTodoDone={setIsTodoDone}
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
        <PlayButton onPlayCountdown={handlePlayCountdown} />
      </section>
    </div>
  );
};

export default TodoItem;
