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
}
