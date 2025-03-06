import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';
import TimerProvider from './providers/timer-provider';

describe('Todo timer', () => {
  describe('create, edit and mark todos as done', () => {
    it('should create a new todo on click enter', async () => {
      render(
        <TimerProvider>
          <TodoTimer />
        </TimerProvider>
      );

      const input = screen.getByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.');
      expect(input as HTMLTextAreaElement).toHaveValue('Buy avocado.');

      await userEvent.type(input, '{enter}');
      const newTodo = screen.queryAllByLabelText('Todo title');

      expect(newTodo.length).toBeGreaterThan(0);
    });
    it('should edit inline the todo title', async () => {
      render(
        <TimerProvider>
          <TodoTimer />
        </TimerProvider>
      );

      const todo =
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
      todo.forEach((text) => expect(text).toBeInTheDocument());

      const firstTodo = todo[0];
      expect(firstTodo).toBeInTheDocument();
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      expect(input).toHaveValue(firstTodo.textContent);
    });
    it('should not edit the todo title if the user press escape key', async () => {
      render(
        <TimerProvider>
          <TodoTimer />
        </TimerProvider>
      );

      const todo =
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
      todo.forEach((text) => expect(text).toBeInTheDocument());

      const firstTodo = todo[0];
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      await userEvent.type(input, '{escape}*EWe...');

      expect(input).toHaveValue(firstTodo.textContent);
    });
    it('should check the todo as done when click on the checkbox', async () => {
      render(
        <TimerProvider>
          <TodoTimer />
        </TimerProvider>
      );

      const checkbox = screen.getAllByLabelText(
        'Check or uncheck the todo as done'
      );
      checkbox.forEach((input) => {
        expect(input).toBeInTheDocument();
      });

      const firstCheckbox = checkbox[0];
      expect(firstCheckbox).not.toBeChecked();

      await userEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();

      const todo = screen.getAllByLabelText('Todo title');
      todo.forEach((todoTitle) => {
        expect(todoTitle).toBeInTheDocument();
      });

      const firstTodoDone = todo[0];
      expect(firstTodoDone).toHaveClass('done');
    });
  });
  describe('starts the timer attached to a selected todo', () => {
    it('should start the countdown when click the first todo play button', async () => {
      vi.stubGlobal('jest', {
        advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
      });

      vi.useFakeTimers();

      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

      render(
        <TimerProvider>
          <TodoTimer />
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

      await user.click(playButton);

      await vi.advanceTimersByTimeAsync(600000); // Advance by ten minutes

      expect(
        await screen.findByLabelText('Number of minutes left')
      ).toHaveTextContent('15');

      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    }, 10000);

    // cuando le doy al pause, cambia el botón.
  });
});
