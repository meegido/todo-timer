import { Todo, TodoClient, TodoVariant } from '../todo.types';
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
  editTodo = (id: string, updatedTodo: Partial<Todo>): Promise<Todo> => {
    if (!id) {
      throw new Error('Todo id is required for editing.');
    }

    return Promise.resolve({
      id: id,
      title: updatedTodo.title ?? 'Default Title',
      variant: updatedTodo.variant ?? TodoVariant.INACTIVE,
      completed: updatedTodo.completed ?? false,
    });
  };
}
