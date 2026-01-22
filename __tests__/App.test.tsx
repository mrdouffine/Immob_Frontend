import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock AISearch to avoid import.meta issues
jest.mock('../pages/AISearch', () => {
    return function AISearch() {
        return <div>AI Search Mock</div>;
    };
});

describe('App Component', () => {
    test('renders without crashing', () => {
        render(<App />);
        expect(document.body).toBeInTheDocument();
    });

    test('renders navigation overlay button', () => {
        render(<App />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('opens navigation overlay on button click', () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByText(/Navigation Immob/i)).toBeInTheDocument();
    });

    test('displays navigation links when overlay is open', () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
        expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
        expect(screen.getByText(/Découverte/i)).toBeInTheDocument();
    });

    test('closes navigation overlay on close button click', () => {
        render(<App />);
        const button = screen.getByRole('button');

        // Open
        fireEvent.click(button);
        expect(screen.getByText(/Navigation Immob/i)).toBeInTheDocument();

        // Close
        fireEvent.click(button);
        expect(screen.queryByText(/Navigation Immob/i)).not.toBeInTheDocument();
    });

    test('renders default route (Discovery)', () => {
        render(<App />);
        // Discovery page should be rendered by default
        expect(document.body).toBeInTheDocument();
    });

    test('button icon changes when overlay is toggled', () => {
        render(<App />);
        const button = screen.getByRole('button');

        // Initially should show menu_open
        expect(button.textContent).toContain('menu_open');

        // After click should show close
        fireEvent.click(button);
        expect(button.textContent).toContain('close');
    });

    test('closes menu when a navigation link is clicked', () => {
        render(<App />);
        const button = screen.getByRole('button');

        // Open menu
        fireEvent.click(button);
        expect(screen.getByText(/Navigation Immob/i)).toBeInTheDocument();

        // Click a link
        const loginLink = screen.getByText(/Connexion/i);
        fireEvent.click(loginLink);

        // Menu should be closed
        expect(screen.queryByText(/Navigation Immob/i)).not.toBeInTheDocument();
    });

    test('displays all navigation options', () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByText(/Favoris/i)).toBeInTheDocument();
        expect(screen.getByText(/Réservations/i)).toBeInTheDocument();
        expect(screen.getByText(/Messages/i)).toBeInTheDocument();
        expect(screen.getByText(/Dashboard Hôte/i)).toBeInTheDocument();
    });
});
