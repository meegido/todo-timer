import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';
import TodoItem from './components/todo-item/todo-item';
import TimerProvider from './providers/timer-provider';

describe('Todo timer', () => {
  describe('create, edit and list todos', () => {
    it('the user create the todo when click enter after writing', async () => {
      render(<TodoTimer />);

      const input = screen.getByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.');
      expect(input as HTMLTextAreaElement).toHaveValue('Buy avocado.');

      await userEvent.type(input, '{enter}');
      const newTodo = screen.queryAllByLabelText('Todo title');

      expect(newTodo.length).toBeGreaterThan(0);
    });

    it('the user edit the todo if clicks on the todo text', async () => {
      render(<TodoTimer />);

      const todo =
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
      todo.forEach((text) => expect(text).toBeInTheDocument());

      const firstTodo = todo[0];
      expect(firstTodo).toBeInTheDocument();
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      expect(input).toHaveValue(firstTodo.textContent);
    });

    it('the user exit the todo edit mode when press escape key', async () => {
      render(<TodoTimer />);

      const todo =
        screen.queryAllByLabelText<HTMLParagraphElement>('Todo title');
      todo.forEach((text) => expect(text).toBeInTheDocument());

      const firstTodo = todo[0];
      await userEvent.click(firstTodo);

      const input = screen.getByLabelText('Edit your todo title');
      await userEvent.type(input, '{escape}*EWe...');

      expect(input).toHaveValue(firstTodo.textContent);
    });

    it('the user check the todo as done by clicking the checkbox input', async () => {
      render(<TodoTimer />);

      const radioInput = screen.getAllByLabelText(
        'Check or uncheck the todo as done'
      );
      radioInput.forEach((input) => {
        expect(input).toBeInTheDocument();
      });

      const firstRadioInput = radioInput[0];
      expect(firstRadioInput).not.toBeChecked();

      await userEvent.click(firstRadioInput);
      expect(firstRadioInput).toBeChecked();

      const doneTitle = screen.getAllByLabelText('Todo title');
      doneTitle.forEach((title) => {
        expect(title).toBeInTheDocument();
      });

      const firstDoneTitle = doneTitle[0];
      expect(firstDoneTitle).toHaveClass('done');
    });

    it.skip(`the user check the todo as done when there aren't other todos in edit mode`, () => {});
  });
  describe('countdown 25min time left', () => {
    it('always displays the duration with two digits for minutes and seconds', () => {
      render(<TodoTimer />);

      const minutes = screen.getByLabelText(`Number of minutes left`);
      expect(minutes).toBeInTheDocument();

      const seconds = screen.getByLabelText(`Number of seconds left`);
      expect(seconds).toBeInTheDocument();
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

      render(<TodoTimer />);
      const [firstTodo] = await screen.findAllByRole('article');
      expect(firstTodo).toBeInTheDocument();

      const playButton = await within(firstTodo).findByRole('button');
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
            isActiveTodo={true}
            onSetActiveTodo={() => {}}
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
  });
});
