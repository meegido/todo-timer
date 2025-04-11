import { Todo, TodoVariant } from '../../../todo.types';
import styles from './checkbox-done.module.css';

interface CheckboxDoneProps {
  todo: Todo;
  variant: TodoVariant;
  onToggle: (newVariant: TodoVariant) => void;
}

const CheckboxDone = ({ todo, variant, onToggle }: CheckboxDoneProps) => {
  const isDone = variant === TodoVariant.DONE;

  return (
    <div className={styles.check__wrapper}>
      <label htmlFor={`done-${todo.id}`} className={styles.visually__hidden}>
        Check or uncheck the todo as done
      </label>
      <input
        type="checkbox"
        name="done"
        id={`done-${todo.id}`}
        aria-label="Check or uncheck the todo as done"
        checked={isDone}
        onChange={(event) => {
          const newVariant = event.target.checked
            ? TodoVariant.DONE
            : TodoVariant.INACTIVE;
          onToggle(newVariant);
        }}
      />
    </div>
  );
};

export default CheckboxDone;
