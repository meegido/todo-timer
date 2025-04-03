import { Todo, TodoClient, TodoVariant, UpdatedTodo } from '../todo.types';
import { todosMockResponse } from './mock-todos';

export class InMemoryTodoClient implements TodoClient {
  retrieveAll = (): Promise<Todo[]> => {
    return Promise.resolve(todosMockResponse);
  };
  createTodo = (title: string): Promise<Todo> => {
    return Promise.resolve({
      id: '234234234234234',
      title: title,
      variant: TodoVariant.INACTIVE,
      completed: false,
    });
  };

  editTodo = (id: string, updatedTodo: UpdatedTodo): Promise<Todo> => {
    const existingTodo = todosMockResponse.find((todo) => todo.id === id);
    if (!existingTodo) {
      throw new Error('Todo not found.');
    }

    return Promise.resolve({
      id: id,
      title:
        updatedTodo.title !== undefined
          ? updatedTodo.title
          : existingTodo.title,
      variant:
        updatedTodo.variant !== undefined
          ? updatedTodo.variant
          : existingTodo.variant,
      completed:
        updatedTodo.completed !== undefined
          ? updatedTodo.completed
          : existingTodo.completed,
    });
  };

  deleteTodo = (id: string) => {
    if (!id) {
      throw new Error('Todo id is required for deleting.');
    }

    return Promise.resolve();
  };
}
