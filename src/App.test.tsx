import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('shows the app name', () => {
    render(<App />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
  });
});
