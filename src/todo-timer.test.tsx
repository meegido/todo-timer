import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';

describe('Todo timer', () => {
  it('provides an input to create a todo when press enter', async () => {
    render(<TodoTimer />);

    const input = screen.getByLabelText('create-input');
    await userEvent.type(input, 'Buy avocado.');
    expect(input as HTMLInputElement).toHaveValue('Buy avocado.');

    await userEvent.type(input, '{enter}');
    const newTodo = screen.queryAllByLabelText('todo');

    expect(newTodo.length).toBeGreaterThan(0);
  });
  it('enters in edit mode when the user clicks on the task', async () => {
    render(<TodoTimer />);

    const todo = screen.queryAllByLabelText<HTMLParagraphElement>('todo');
    todo.forEach((text) => expect(text).toBeInTheDocument());

    const firstTodo = todo[0];
    await userEvent.click(firstTodo);

    const input = screen.getByLabelText('edit-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(firstTodo.textContent);
  });
});
