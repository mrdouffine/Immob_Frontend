import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../pages/Register';

const renderRegister = () => {
    return render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );
};

describe('Register Component', () => {
    test('renders registration form', () => {
        renderRegister();
        expect(screen.getByText(/Créer un compte/i)).toBeInTheDocument();
    });

    test('renders Immob logo', () => {
        renderRegister();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('validates all required fields', async () => {
        renderRegister();

        const submitButton = screen.getByRole('button', { name: /S'inscrire/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Le prénom est requis/i)).toBeInTheDocument();
            expect(screen.getByText(/Le nom est requis/i)).toBeInTheDocument();
            expect(screen.getByText(/L'email est requis/i)).toBeInTheDocument();
            expect(screen.getByText(/Le mot de passe est requis/i)).toBeInTheDocument();
        });
    });

    test('validates email format', async () => {
        renderRegister();

        const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
        const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Format d'email invalide/i)).toBeInTheDocument();
        });
    });

    test('validates password length', async () => {
        renderRegister();

        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Minimum 8 caractères requis/i)).toBeInTheDocument();
        });
    });

    test('validates terms acceptance', async () => {
        renderRegister();

        const inputs = screen.getAllByRole('textbox');
        const firstNameInput = inputs[0]; // First textbox is firstName
        const lastNameInput = inputs[1]; // Second textbox is lastName
        const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Vous devez accepter les conditions/i)).toBeInTheDocument();
        });
    });

    test('accepts valid registration', async () => {
        renderRegister();

        const inputs = screen.getAllByRole('textbox');
        const firstNameInput = inputs[0];
        const lastNameInput = inputs[1];
        const emailInput = screen.getByPlaceholderText(/votre@email.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const termsCheckbox = screen.getByRole('checkbox');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(termsCheckbox);

        // No errors should be displayed
        await waitFor(() => {
            expect(screen.queryByText(/est requis/i)).not.toBeInTheDocument();
        });
    });

    test('clears firstName error when user starts typing', async () => {
        renderRegister();

        const inputs = screen.getAllByRole('textbox');
        const firstNameInput = inputs[0];
        const submitButton = screen.getByRole('button', { name: /S'inscrire/i });

        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/Le prénom est requis/i)).toBeInTheDocument();
        });

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        await waitFor(() => {
            expect(screen.queryByText(/Le prénom est requis/i)).not.toBeInTheDocument();
        });
    });

    test('renders Google signup button', () => {
        renderRegister();
        expect(screen.getByRole('button', { name: /GOOGLE/i })).toBeInTheDocument();
    });

    test('renders login link', () => {
        renderRegister();
        expect(screen.getByText(/Déjà un compte/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Connectez-vous/i })).toBeInTheDocument();
    });

    test('displays password hint', () => {
        renderRegister();
        expect(screen.getByText(/Minimum 8 caractères/i)).toBeInTheDocument();
    });
});
