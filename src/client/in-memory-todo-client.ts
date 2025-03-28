import { mockResponseTodos } from './mock-todos';

export interface Todo {
  id: string;
  title: string;
  variant: TodoVariant;
}

export enum TodoVariant {
  INACTIVE = 'inactive',
  ON_GOING = 'on__going',
  PAUSED = 'paused',
  DONE = 'done',
}

export interface TodoClient {
  baseUrl?: string;
  retrieveAll: () => Promise<Todo[]>;
}

export class InMemoryTodoClient implements TodoClient {
  retrieveAll = (): Promise<Todo[]> => {
    return Promise.resolve(mockResponseTodos);
  };
}
