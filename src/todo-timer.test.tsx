import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoTimer from './todo-timer';
import userEvent from '@testing-library/user-event';

describe('Todo timer', () => {
  it('provides an input to create a todo when press enter', async () => {
    render(<TodoTimer />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Buy avocado.');
    expect(textarea as HTMLInputElement).toHaveValue('Buy avocado.');

    await userEvent.type(textarea, '{enter}');
    const newTodo = screen.queryAllByLabelText('todo');

    expect(newTodo.length).toBeGreaterThan(0);
  });
});
