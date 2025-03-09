import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import TodoTimer from './todo-timer.tsx';
import TimerProvider from './providers/timer-provider.tsx';
import { InMemoryTodoClient } from './todo-client.ts';

const todoClient = new InMemoryTodoClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
      <TodoTimer todoClient={todoClient} />
    </TimerProvider>
  </StrictMode>
);
