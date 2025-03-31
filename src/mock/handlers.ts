import { http, HttpResponse } from 'msw';
import { todosMockResponse } from '../client/mock-todos';

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

export const todoHandlers = [retrieveAllTodos()];
