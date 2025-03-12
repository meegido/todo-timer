import { render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import TimerProvider from '../providers/timer-provider';
import TodoTimer from '../todo-timer';
import { Todo, TodoClient, TodoVariant } from '../todo-client';
import userEvent from '@testing-library/user-event';

class FakeTodoClient implements TodoClient {
  retrieve = (): Todo[] => {
    return [
      {
        title: 'Read the article about Testing Library',
        id: 'i234234',
        variant: TodoVariant.INACTIVE,
      },
      { title: 'UI Benchmark', id: '3w4hkljsd', variant: TodoVariant.INACTIVE },
      {
        title: 'Split the tasks into small slices',
        id: '3549349348',
        variant: TodoVariant.INACTIVE,
      },
      {
        title: 'Understand container queries',
        id: 'i2¡3453244234',
        variant: TodoVariant.INACTIVE,
      },
      {
        title: 'Understand mix-max widht',
        id: '30909w4hkljsd',
        variant: TodoVariant.INACTIVE,
      },
      {
        title: `Don't forget to do a proper slicing`,
        id: '35493493432238',
        variant: TodoVariant.INACTIVE,
      },
    ];
  };
}

describe('The timer countdown', () => {
  let todoClient: TodoClient;
  beforeEach(() => {
    todoClient = new FakeTodoClient();
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
