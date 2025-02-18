import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import TodoTimer from './todo-timer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoTimer />
  </StrictMode>
);
