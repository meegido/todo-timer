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

  it('lets the user edit todos by clicking the todo text', async () => {
    render(<TodoTimer />);

    const editableTodos = screen.getAllByLabelText('todo');
    editableTodos.forEach((todo) => expect(todo).toBeInTheDocument());

    const firstTodo = editableTodos[0];
    await userEvent.click(firstTodo);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(firstTodo.textContent);

    // await userEvent.keyboard('{enter}');
  });
});
