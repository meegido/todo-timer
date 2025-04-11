import { Todo, TodoVariant } from '../todo.types';

export const todosMockResponse: Todo[] = [
  {
    title: 'Read the article about Testing Library',
    id: 'i234234',
    variant: TodoVariant.INACTIVE,
  },
  {
    title: 'UI Benchmark',
    id: '3w4hkljsd',
    variant: TodoVariant.INACTIVE,
  },
  {
    title: 'Split the tasks into small slices',
    id: '3549349348',
    variant: TodoVariant.DONE,
  },
  {
    title: 'Understand container queries',
    id: 'i2¡3453244234',
    variant: TodoVariant.INACTIVE,
  },
  {
    title: 'Understand mix-max widht',
    id: '30909w4hkljsd',
    variant: TodoVariant.INACTIVE,
  },
  {
    title: `Don't forget to do a proper slicing`,
    id: '35493493432238',
    variant: TodoVariant.PAUSED,
  },
];

export const todosNotFoundResponse: Error = new Error(
  'Error retrieving your Todos'
);

export const newMockTodo: Todo = {
  id: '234234234234234',
  title: 'New todo created',
  variant: TodoVariant.INACTIVE,
};
