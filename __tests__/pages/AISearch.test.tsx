import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AISearch from '../../pages/AISearch';

// Mock import.meta
Object.defineProperty(global, 'import', {
    value: {
        meta: {
            env: {
                VITE_GEMINI_API_KEY: 'test-key',
            },
        },
    },
    writable: true,
});

const renderAISearch = () => {
    return render(
        <BrowserRouter>
            <AISearch />
        </BrowserRouter>
    );
};

describe('AISearch Component', () => {
    test('renders AI badge', () => {
        renderAISearch();
        expect(screen.getByText(/IA Concierge Active/i)).toBeInTheDocument();
    });

    test('renders main heading', () => {
        renderAISearch();
        expect(screen.getByText(/Votre Concierge IA Personnel/i)).toBeInTheDocument();
    });

    test('renders description', () => {
        renderAISearch();
        expect(screen.getByText(/Décrivez vos envies/i)).toBeInTheDocument();
    });

    test('renders search input', () => {
        renderAISearch();
        expect(screen.getByPlaceholderText(/Décrivez votre séjour idéal/i)).toBeInTheDocument();
    });

    test('renders search button', () => {
        renderAISearch();
        expect(screen.getByText(/Rechercher avec l'IA/i)).toBeInTheDocument();
    });
});
