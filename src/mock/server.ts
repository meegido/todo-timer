import { setupServer } from 'msw/node';
import { todoHandlers } from './handlers';

export const server = setupServer(...todoHandlers);
