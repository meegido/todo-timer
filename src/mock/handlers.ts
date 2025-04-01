import { http, HttpResponse } from 'msw';
import { newMockTodo, todosMockResponse } from '../client/mock-todos';

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

export const todoHandlers = [retrieveAllTodos(), createTodo()];
