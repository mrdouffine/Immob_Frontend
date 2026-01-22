import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PropertyDetails from '../../pages/PropertyDetails';

// Mock useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: 'villa-1' }),
}));

const renderPropertyDetails = () => {
    return render(
        <BrowserRouter>
            <PropertyDetails />
        </BrowserRouter>
    );
};

describe('PropertyDetails Component', () => {
    test('renders Immob logo', () => {
        renderPropertyDetails();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders search bar', () => {
        renderPropertyDetails();
        expect(screen.getByPlaceholderText(/Rechercher des destinations/i)).toBeInTheDocument();
    });

    test('renders share button', () => {
        renderPropertyDetails();
        expect(screen.getByText(/Partager/i)).toBeInTheDocument();
    });

    test('renders save button', () => {
        renderPropertyDetails();
        expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
    });

    test('displays booking widget', () => {
        renderPropertyDetails();
        expect(screen.getByText(/Réserver/i)).toBeInTheDocument();
    });

    test('displays price information', () => {
        renderPropertyDetails();
        const priceElements = screen.getAllByText(/€/);
        expect(priceElements.length).toBeGreaterThan(0);
    });
});
