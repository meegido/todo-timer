import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import TodoTimer from './todo-timer.tsx';
import TimerProvider from './providers/timer-provider.tsx';
import { SupabaseTodoClient } from './client/supabase-todo-client.ts';

async function enableMocking() {
  if (import.meta.env.VITE_APP_MOCKS !== true) {
    return;
  }
  const { worker } = await import('./mock/browser');
  return worker.start();
}

const todoClient = new SupabaseTodoClient();

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      </StrictMode>
    );
  })
  .catch((err) => console.error(err));
