import { Todo, TodoClient, UpdatedTodo } from '../todo.types';

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
        body: JSON.stringify({ title: todoTitle }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error creating todo: ${response.statusText}`);
    }

    const newTodo = (await response.json()) as Todo;
    return newTodo;
  };

  editTodo = async (id: string, updatedTodo: UpdatedTodo): Promise<Todo> => {
    if (!id) {
      throw new Error('Todo id is required for editing.');
    }

    console.log(id, updatedTodo, 'in fetch');

    const response = await fetch(
      `https://web-production-e33d.up.railway.app/api/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating  todo: ${response.statusText}`);
    }

    return (await response.json()) as Todo;
  };

  deleteTodo = async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Todo id is required for deleting.');
    }

    const response = await fetch(
      `https://web-production-e33d.up.railway.app/api/todos/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting  todo: ${response.statusText}`);
    }

    return;
  };
}
