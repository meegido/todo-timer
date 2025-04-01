export interface Todo {
  id: string;
  title: string;
  variant: TodoVariant;
  completed: boolean;
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
  createTodo: (title: string) => Promise<Todo>;
}
