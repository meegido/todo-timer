import React from 'react';
import styles from './todo-timer.module.css';

interface Todo {
  id: string;
  title: string;
}

const data = [
  { title: 'Read the article about Testing Library', id: 'i234234' },
  { title: 'UI Benchmark', id: '3w4hkljsd' },
];

function TodoTimer() {
  const [todos, setTodos] = React.useState<Todo[]>(data);
  const [inputTodoValue, setInputTodoValue] = React.useState<string>('');

  const handleCreateTodo = () => {
    setTodos((prevTodos: Todo[]) => [
      ...prevTodos,
      { id: Date.now().toString(), title: inputTodoValue },
    ]);
    setInputTodoValue('');
  };

  return (
    <main>
      <h1>Todo Timer</h1>
      <section className={styles.card__wrapper}>
        {todos.map((todo) => (
          <article key={todo.id} className={`${styles.card} ${styles.created}`}>
            <fieldset>
              <label className={styles.visually__hidden} htmlFor="check-todo">
                Check todo
              </label>
              <input
                type="radio"
                name="check-todo"
                id="check-todo"
                value="check-todo"
                checked={false}
              />
            </fieldset>
            <p key={todo.id} aria-label={'todo'}>
              {todo.title}
            </p>
          </article>
        ))}
      </section>

      <section className={`${styles.input__card__wrapper}`}>
        <fieldset className={`${styles.card}`}>
          <label className={styles.visually__hidden} htmlFor="todo-text">
            Create a todo
          </label>
          <textarea
            name="todo-text"
            id="todo-text"
            value={inputTodoValue}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputTodoValue(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleCreateTodo();
              }
            }}
          />
        </fieldset>
      </section>
    </main>
  );
}

export default TodoTimer;
