import { setupWorker } from 'msw/browser';
import { todoHandlers } from './handlers';

export const worker = setupWorker(...todoHandlers);
