import styles from './todo-list.module.css';
import { Todo } from '../../todo-timer';
import TodoItem from '../todo-item/todo-item';

interface TodoListProps {
  todo: Todo;
  onUpdateTodo: (id: string, handleUpdateTodo: Todo) => void;
}
const TodoList = ({ todo, onUpdateTodo }: TodoListProps) => {
  return (
    <article className={styles.card__wrapper}>
      <TodoItem todo={todo} onUpdateTodo={onUpdateTodo} />
    </article>
  );
};

export default TodoList;
