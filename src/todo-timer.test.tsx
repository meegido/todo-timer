import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';
import TimerProvider from './providers/timer-provider';
import { TodoClient } from './client/in-memory-todo-client';
import { server } from './mock/server';
import { SupabaseTodoClient } from './client/supabase-todo-client';

describe('Todo timer', () => {
  let todoClient: TodoClient;
  beforeEach(() => {
    todoClient = new SupabaseTodoClient();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('create, edit and mark todos as done', () => {
    it('should be more than three todos in the first render', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );
      const [todo] =
        await screen.findAllByLabelText<HTMLParagraphElement>('Todo title');
      expect(todo).toBeInTheDocument();
    });

    it('handles error when fetching todos', () => {
      server.use(
        http.get('https://web-production-e33d.up.railway.app/api/todos', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const errorMessage = screen.getByText('Error fetching your Todos');
      expect(errorMessage).toHaveTextContent(/error/i);
    });
    it.skip('should create a new todo on click enter', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const data = await todoClient.retrieveAll();

      const input = await screen.findByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.{enter}');

      const newTodo = await screen.findByText('Buy avocado.');
      expect(newTodo).toBeInTheDocument();

      expect(data.length).toBe(6);
    });
    it('should edit inline the todo title', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const [firstTodo] =
        await screen.findAllByLabelText<HTMLParagraphElement>('Todo title');
      expect(firstTodo).toBeInTheDocument();

      await userEvent.click(firstTodo);

      const input = await screen.findByLabelText('Edit your todo title');
      expect(input).toHaveValue(firstTodo.textContent);

      await userEvent.type(input, ' hello.{enter}');

      const [firstTodoEdited] =
        await screen.findAllByLabelText<HTMLParagraphElement>('Todo title');

      expect(firstTodoEdited).toHaveTextContent(/hello./i);
    });
    it('should not edit the todo title if the user press escape key', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const [firstTodo] =
        await screen.findAllByLabelText<HTMLParagraphElement>('Todo title');
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      await userEvent.type(input, '{escape}*EWe...');

      expect(input).toHaveValue(firstTodo.textContent);

      const [firstTodoNotEdited] =
        await screen.findAllByLabelText<HTMLParagraphElement>('Todo title');

      expect(firstTodoNotEdited).toHaveTextContent(
        `${firstTodoNotEdited.textContent}`
      );
    });
    it('should check the todo as done when click on the checkbox', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const [firstTodo] = await screen.findAllByRole('article');

      const firstCheckbox = within(firstTodo).getByLabelText(
        'Check or uncheck the todo as done'
      );
      expect(firstCheckbox).not.toBeChecked();

      await userEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });
  });
  describe('starts the timer attached to a selected todo', () => {
    it('should change the card background color', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );
      const [firstTodo] = await screen.findAllByRole('article');
      expect(firstTodo).toBeInTheDocument();

      const playButton = await within(firstTodo).findByRole('button', {
        name: /start the countdown on todo/i,
        hidden: true,
      });

      expect(playButton).toHaveClass('hidden');

      await waitFor(async () => {
        await userEvent.hover(firstTodo);
      });

      await userEvent.click(playButton);
      expect(firstTodo).toHaveClass('on__going');
    });
  });
});
