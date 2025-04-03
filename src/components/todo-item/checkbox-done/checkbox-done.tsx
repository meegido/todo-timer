import { Todo } from '../../../todo.types';
import styles from './checkbox-done.module.css';

interface CheckboxDoneProps {
  todo: Todo;
  isTodoDone: boolean;
  setIsTodoDone: React.Dispatch<boolean>;
  // onSave: () => void;
}

const CheckboxDone = ({
  todo,
  isTodoDone,
  setIsTodoDone,
  // onSave,
}: CheckboxDoneProps) => {
  return (
    <div className={styles.check__wrapper}>
      <label htmlFor={`done-${todo.id}`} className={styles.visually__hidden}>
        Check or uncheck the todo as done
      </label>
      <input
        type="checkbox"
        name="done"
        id={`done-${todo.id}`}
        value="done"
        aria-label="Check or uncheck the todo as done"
        checked={isTodoDone}
        onChange={() => {
          setIsTodoDone(!isTodoDone);
          // onSave();
        }}
      />
    </div>
  );
};

export default CheckboxDone;
