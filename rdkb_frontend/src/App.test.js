import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sidebar brand title', () => {
  render(<App />);
  const title = screen.getByText(/RDK-B FWA/i);
  expect(title).toBeInTheDocument();
});
