import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button Agregar Regalo', () => {
  render(<App />);
  const linkElement = screen.getByText(/Agregar Regalo/i);
  expect(linkElement).toBeInTheDocument();
});
