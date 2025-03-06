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
  describe('the todo timer starts when user clicks the todo play button', () => {
    it('should show the play button on hover the todo', async () => {
      render(<TodoTimer />);
      const [firstTodo] = await screen.findAllByRole('article');
      expect(firstTodo).toBeInTheDocument();

      const playButton = await within(firstTodo).findByRole('button');
      expect(playButton).toHaveClass('hidden');

      await userEvent.hover(firstTodo);
      await waitFor(() => {
        expect(within(firstTodo).queryByRole('button')).toBeVisible();
      });
    });
    it.skip('should play the timer when user focus a todo item and click enter', () => {
      // click on the todo
      // focus the todo or getting it with ref
      // show it's focused
      // enter to play the timer
    });
    it('should click the first todo button to start the countdown', async () => {
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

    it('should apply a green background color when the play button is clicked', async () => {
      const todo = { id: '1', title: 'Test Todo' };
      render(
        <TimerProvider>
          <TodoItem
            todo={todo}
            onUpdateTodo={() => {}}
            onHandlePlay={() => {}}
            onHandlePause={() => {}}
            isActiveTodo={true}
            onSetActiveTodo={() => {}}
            isCountdownActive={true}
            isCountdownPaused={false}
          ></TodoItem>
        </TimerProvider>
      );
      const [firstTodo] = screen.getAllByLabelText(`Todo item ${todo.id}`);
      expect(firstTodo).toBeInTheDocument();
      expect(firstTodo).not.toHaveClass('car__green');

      const playButton = await within(firstTodo).findByRole('button');
      expect(playButton).toHaveClass('hidden');

      await waitFor(async () => {
        await userEvent.hover(firstTodo);
      });

      await userEvent.click(playButton);

      expect(firstTodo).toHaveClass('card__green');
    });
    it.skip('should apply a yellow background color when the pause button is clicked', async () => {
      // it fails when getting the buttons by label because the timer in the test is not paused.
      // The timer must to be mocked and in the proper file.
      const todo = { id: '1', title: 'Test Todo' };
      render(
        <TimerProvider>
          <TodoItem
            todo={todo}
            onUpdateTodo={() => {}}
            onHandlePlay={() => {}}
            onHandlePause={() => {}}
            isActiveTodo={true}
            onSetActiveTodo={() => {}}
            isCountdownActive={true}
            isCountdownPaused={false}
          ></TodoItem>
        </TimerProvider>
      );
      const [firstTodo] = screen.getAllByLabelText(`Todo item ${todo.id}`);
      expect(firstTodo).toBeInTheDocument();
      expect(firstTodo).not.toHaveClass('car__green');

      const playButton = await within(firstTodo).findByLabelText('Play');
      expect(playButton).toHaveClass('hidden');

      await waitFor(async () => {
        await userEvent.hover(firstTodo);
      });

      await userEvent.click(playButton);

      expect(firstTodo).toHaveClass('card__green');

      const pauseButton = await within(firstTodo).findByRole('button');
      expect(pauseButton).toBeInTheDocument();
    });
  });
});
