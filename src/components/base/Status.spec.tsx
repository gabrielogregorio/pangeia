import { Status } from '@/components/base/Status';
import { render, screen } from '@testing-library/react';

describe('Status', () => {
  it('Error is loading', () => {
    render(<Status isLoading={false} error="error example" />);

    expect(screen.getByRole('alert')).toHaveTextContent('error example');
  });

  it('Status is loading', () => {
    render(<Status isLoading error="" />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });
});
