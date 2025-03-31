import { TodoClient, Todo } from './in-memory-todo-client';

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
}
