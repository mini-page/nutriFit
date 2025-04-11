tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CycleCalendar from './CycleCalendar';

describe('CycleCalendar', () => {
  it('renders without crashing', () => {
    render(<CycleCalendar />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});