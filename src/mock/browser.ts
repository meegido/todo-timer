import { setupWorker } from 'msw/browser';
import { todoHandlers } from './handlers';

const initMocks = async () => {
  const worker = setupWorker(...todoHandlers);
  await worker.start();
};

export default initMocks;
