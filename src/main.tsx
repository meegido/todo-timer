import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import TodoTimer from './todo-timer.tsx';
import TimerProvider from './providers/timer-provider.tsx';
import { SupabaseTodoClient } from './client/supabase-todo-client.ts';
import initMocks from './mock/browser.ts';

if (import.meta.env.VITE_APP_MOCKS === 'true') {
  await initMocks();
}

const todoClient = new SupabaseTodoClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
      <TodoTimer todoClient={todoClient} />
    </TimerProvider>
  </StrictMode>
);
