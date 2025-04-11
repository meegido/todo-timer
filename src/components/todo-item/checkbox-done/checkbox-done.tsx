import { Todo } from '../../../todo.types';
import styles from './checkbox-done.module.css';

interface CheckboxDoneProps {
  todo: Todo;
  isDone: boolean;
  setIsDone: React.Dispatch<boolean>;
}

const CheckboxDone = ({ todo, isDone, setIsDone }: CheckboxDoneProps) => {
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
          setIsDone(event?.target.checked);
        }}
      />
    </div>
  );
};

export default CheckboxDone;
