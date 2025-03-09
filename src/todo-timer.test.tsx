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

      const input = screen.getByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.');
      expect(input as HTMLTextAreaElement).toHaveValue('Buy avocado.');

      await userEvent.type(input, '{enter}');
      const newTodo = screen.queryAllByLabelText('Todo title');

      expect(newTodo.length).toBeGreaterThan(0);
      // supuestamente debería venir de un fetch. Encapsular que data devuelva algo en algún punto.
      // Encapsular la fuente de datos y hacer una función que los devuelva y pueda mockear.
    });
    it('should edit inline the todo title', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
        </TimerProvider>
      );

      const todo =
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
      todo.forEach((text) => expect(text).toBeInTheDocument());
      const firstTodo = todo[0];
      // const [todoEdited] = screen.getBy....

      expect(firstTodo).toBeInTheDocument();
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      expect(input).toHaveValue(firstTodo.textContent);
    });
    it('should not edit the todo title if the user press escape key', async () => {
      render(
        <TimerProvider>
          <TodoTimer todoClient={todoClient} />
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
          <TodoTimer todoClient={todoClient} />
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
