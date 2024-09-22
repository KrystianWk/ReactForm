import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

test('shows error when passwords do not match', async () => {
  render(<RegistrationForm />);

  // Symulacja wprowadzania różnych haseł
  const passwordInput = screen.getByPlaceholderText('Wpisz swoje hasło');
  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

  const confirmPasswordInput = screen.getByPlaceholderText(
    'Powtórz swoje hasło'
  );
  fireEvent.change(confirmPasswordInput, { target: { value: 'Password456!' } });

  const submitButton = screen.getByRole('button', { name: /zarejestruj się/i });
  fireEvent.click(submitButton);

  // Sprawdzenie, czy wyświetla się błąd, gdy hasła się nie zgadzają
  const errorMessage = await screen.findByText('Hasła muszą być takie same');
  expect(errorMessage).toBeInTheDocument();
});
