tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WaterTracker } from '../ui/water-tracker';

describe('WaterTracker', () => {
  it('renders without errors', () => {
    render(<WaterTracker />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});