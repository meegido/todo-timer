import { http, HttpResponse } from 'msw';
import { newMockTodo, todosMockResponse } from '../client/mock-todos';
import { Todo } from '../todo.types';

export const retrieveAllTodos = () => {
  return http.get(
    'https://web-production-e33d.up.railway.app/api/todos',
    () => {
      return HttpResponse.json(todosMockResponse, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  );
};

export const createTodo = () => {
  const allTodos = new Map();
  return http.post(
    'https://web-production-e33d.up.railway.app/api/todos',
    async ({ request }) => {
      const newTodo = await request.json();
      allTodos.set(newMockTodo.title, newTodo);
      return HttpResponse.json(newTodo, { status: 201 });
    }
  );
};

export const editTodo = () => {
  return http.put(
    `https://web-production-e33d.up.railway.app/api/todos/:id`,
    async ({ request, params }) => {
      const updates = (await request.json()) as Partial<Todo>;

      const existingTodo = todosMockResponse.findIndex(
        (todo) => todo.id === (params.id as string)
      );

      if (existingTodo === -1) {
        return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
      }

      const updatedTodo: Todo = {
        ...todosMockResponse[existingTodo],
        ...updates,
        id: params.id as string,
      };

      todosMockResponse[existingTodo] = updatedTodo;
      return HttpResponse.json(updatedTodo, { status: 200 });
    }
  );
};

export const deleteTodo = () => {
  return http.delete(
    'https://web-production-e33d.up.railway.app/api/todos/:id',
    ({ params }) => {
      const existingTodo = todosMockResponse.findIndex(
        (todo) => todo.id === (params.id as string)
      );

      if (existingTodo === -1) {
        return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
      }

      console.log(existingTodo);

      todosMockResponse.splice(existingTodo, 1);

      return HttpResponse.json('', {
        status: 204,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  );
};

export const todoHandlers = [
  retrieveAllTodos(),
  createTodo(),
  editTodo(),
  deleteTodo(),
];
