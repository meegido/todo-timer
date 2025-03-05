import React from 'react';
import { Todo } from '../../todo-timer';
import styles from './todo-item.module.css';
import EditTextarea from './edit-textarea/edit-textarea';
import CheckboxDone from './checkbox-done/checkbox-done';
import PlayButton from '../../shared/timer-controls/play-button';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
  onHandlePlay: () => void;
  onSetActiveTodo: () => void;
  isActiveTodo: boolean;
}

const TodoItem = ({
  todo,
  onUpdateTodo,
  onHandlePlay,
  onSetActiveTodo,
  isActiveTodo,
}: TodoItemProps) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editTodoValue, setEditTodoValue] = React.useState<string>('');
  const [isTodoDone, setIsTodoDone] = React.useState<boolean>(false);
  const [isTodoHover, setIsTodoHover] = React.useState<boolean>(false);

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

  const cardClass = isActiveTodo ? styles.card__green : styles.card;
  console.log(isActiveTodo, cardClass, 'Active and class');
  return (
    <div
      className={cardClass}
      aria-label={`Todo item ${todo.id}`}
      onMouseEnter={() => setIsTodoHover(true)}
      onMouseLeave={() => setIsTodoHover(false)}
    >
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
      <PlayButton
        isTodoHover={isTodoHover}
        label={`Start the countdown on todo ${todo.id}`}
        onPlayCountdown={() => {
          onSetActiveTodo();
          onHandlePlay();
        }}
      />
    </div>
  );
};

export default TodoItem;
