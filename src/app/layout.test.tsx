import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

describe('RootLayout smoke', () => {
  it('renders children', () => {
    render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
