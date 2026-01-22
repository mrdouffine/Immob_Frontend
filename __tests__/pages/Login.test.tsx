import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login';

const renderLogin = () => {
    return render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
};

describe('Login Component', () => {
    test('renders login form', () => {
        renderLogin();
        expect(screen.getByText(/Bon retour parmi nous/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/exemple@mail.com/i)).toBeInTheDocument();
    });

    test('renders Immob logo', () => {
        renderLogin();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('displays email validation error for invalid email', async () => {
        renderLogin();

        const emailInput = screen.getByPlaceholderText(/exemple@mail.com/i);
        const submitButton = screen.getByRole('button', { name: /Se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Format d'email invalide/i)).toBeInTheDocument();
        });
    });

    test('displays password validation error for short password', async () => {
        renderLogin();

        const emailInput = screen.getByPlaceholderText(/exemple@mail.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /Se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Le mot de passe doit contenir au moins 8 caractères/i)).toBeInTheDocument();
        });
    });

    test('displays error when email is empty', async () => {
        renderLogin();

        const submitButton = screen.getByRole('button', { name: /Se connecter/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/L'email est requis/i)).toBeInTheDocument();
        });
    });

    test('displays error when password is empty', async () => {
        renderLogin();

        const emailInput = screen.getByPlaceholderText(/exemple@mail.com/i);
        const submitButton = screen.getByRole('button', { name: /Se connecter/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
        });
    });

    test('clears error when user starts typing in email field', async () => {
        renderLogin();

        const emailInput = screen.getByPlaceholderText(/exemple@mail.com/i);
        const submitButton = screen.getByRole('button', { name: /Se connecter/i });

        // Trigger error
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/L'email est requis/i)).toBeInTheDocument();
        });

        // Start typing
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        await waitFor(() => {
            expect(screen.queryByText(/L'email est requis/i)).not.toBeInTheDocument();
        });
    });

    test('clears error when user starts typing in password field', async () => {
        renderLogin();

        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /Se connecter/i });

        // Trigger error
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
        });

        // Start typing
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        await waitFor(() => {
            expect(screen.queryByText(/Le mot de passe est requis/i)).not.toBeInTheDocument();
        });
    });

    test('renders Google login button', () => {
        renderLogin();
        expect(screen.getByRole('button', { name: /Google/i })).toBeInTheDocument();
    });

    test('renders register link', () => {
        renderLogin();
        expect(screen.getByText(/Pas encore de compte/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Inscrivez-vous/i })).toBeInTheDocument();
    });
});
