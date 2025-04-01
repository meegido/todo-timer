import { Todo, TodoClient } from '../todo.types';

export class SupabaseTodoClient implements TodoClient {
  retrieveAll = async (): Promise<Todo[]> => {
    const response = await fetch(
      'https://web-production-e33d.up.railway.app/api/todos'
    );
    if (response.status === 500) {
      throw new Error('Error fetching your Todos');
    }
    const todos: Todo[] = (await response.json()) as Todo[];
    return todos;
  };

  createTodo = async (todoTitle: string): Promise<Todo> => {
    const response = await fetch(
      'https://web-production-e33d.up.railway.app/api/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: todoTitle,
      }
    );

    const newTodo: Todo = await response.json();
    return newTodo;
  };
}
