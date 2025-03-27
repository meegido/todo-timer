import { TodoClient, Todo } from './in-memory-todo-client';

export class SupabaseTodoClient implements TodoClient {
  retrieveAll = async (): Promise<Todo[]> => {
    const response = await fetch(
      'https://web-production-e33d.up.railway.app/api/todos'
    );
    const todos: Todo[] = (await response.json()) as Todo[];
    return todos;
  };
}
