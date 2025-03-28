import { http, HttpResponse } from 'msw';
import { mockResponseTodos } from '../client/mock-todos';

export const getTermMock = () => {
  return http.get(
    'https://web-production-e33d.up.railway.app/api/todos',
    () => {
      return HttpResponse.json(mockResponseTodos, { status: 200 });
    }
  );
};

export const todoHandlers = [getTermMock()];
