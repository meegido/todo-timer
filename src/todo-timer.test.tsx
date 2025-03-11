import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';
import TimerProvider from './providers/timer-provider';
import { Todo, TodoClient } from './todo-client';

class FakeTodoClient implements TodoClient {
  retrieve = (): Todo[] => {
    return [
      { title: 'Read the article about Testing Library', id: 'i234234' },
      { title: 'UI Benchmark', id: '3w4hkljsd' },
      { title: 'Split the tasks into small slices', id: '3549349348' },
      { title: 'Understand container queries', id: 'i2¡3453244234' },
      { title: 'Understand mix-max widht', id: '30909w4hkljsd' },
      { title: `Don't forget to do a proper slicing`, id: '35493493432238' },
    ];
  };
}

describe('Todo timer', () => {
  let todoClient: TodoClient;
  beforeEach(() => {
    todoClient = new FakeTodoClient();
  });

  describe('create, edit and mark todos as done', () => {
    it('should create a new todo on click enter', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const data = todoClient.retrieve();

      const input = screen.getByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.{enter}');

      const newTodo = screen.queryByText('Buy avocado.');
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
        screen.getAllByLabelText<HTMLParagraphElement>('Todo title');
      expect(firstTodo).toBeInTheDocument();

      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
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
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
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
      expect(firstTodo).toHaveClass('green');
    });
  });
});
