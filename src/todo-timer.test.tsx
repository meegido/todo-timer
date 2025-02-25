import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';

describe('Todo timer', () => {
  describe('create, edit and list todos', () => {
    it('provides an input to create a todo when press enter', async () => {
      render(<TodoTimer />);

      const input = screen.getByLabelText('create-input');
      await userEvent.type(input, 'Buy avocado.');
      expect(input as HTMLTextAreaElement).toHaveValue('Buy avocado.');

      await userEvent.type(input, '{enter}');
      const newTodo = screen.queryAllByLabelText('Todo title');

      expect(newTodo.length).toBeGreaterThan(0);
    });

    it('enters in edit mode when the user clicks on the task', async () => {
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

    it('exit the edit mode when the user enters Escape key keeping the original todo title', async () => {
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

    it('mark the todo as done when the user check the radio input', async () => {
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
  });
  describe('countdown 25min time left', () => {
    it('displays the duration with two digits for minutes and seconds', () => {
      render(<TodoTimer />);

      const minutes = screen.getByLabelText(`Number of minutes left`);
      expect(minutes).toBeInTheDocument();

      const seconds = screen.getByLabelText(`Number of seconds left`);
      expect(seconds).toBeInTheDocument();
    });
    it.skip('start counting down when user clicks on play button', async () => {
      render(<TodoTimer />);
      const minutesNumber = '25';
      const secondsNumber = '00';

      const minutes = screen.getByLabelText(`Number of minutes left`);
      expect(minutes).toHaveTextContent(minutesNumber);

      const seconds = screen.getByLabelText(`Number of seconds left`);
      expect(seconds).toHaveTextContent(secondsNumber);

      const playButton = screen.getByRole('button', {
        name: 'Start the countown',
      });
      expect(playButton).toBeInTheDocument();

      await userEvent.click(playButton);
      expect(minutes).toHaveTextContent('24:59');
    });
  });
});
