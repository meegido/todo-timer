import { render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TimerProvider from '../providers/timer-provider';
import TodoTimer from '../todo-timer';
import userEvent from '@testing-library/user-event';
import { TodoClient } from '../todo.types';
import { SupabaseTodoClient } from '../client/supabase-todo-client';

describe('The timer countdown', () => {
  let todoClient: TodoClient;
  beforeEach(() => {
    todoClient = new SupabaseTodoClient();
  });

  it('should start the countdown after user clicks on todo item', async () => {
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
});
