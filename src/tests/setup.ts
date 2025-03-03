import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

declare global {
  const jest: typeof vi;
}
