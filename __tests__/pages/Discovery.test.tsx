import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Discovery from '../../pages/Discovery';

// Mock the store
jest.mock('../../src/store/propertyStore', () => ({
    usePropertyStore: () => ({
        properties: [
            {
                id: '1',
                loc: 'Test Location',
                desc: 'Test Property',
                date: '1-8 jan',
                price: '1000 €',
                rate: '4.9',
                category: 'Villas',
                img: 'test.jpg',
                details: {
                    guests: 4,
                    bedrooms: 2,
                    beds: 2,
                    baths: 1,
                    host: 'Test Host',
                    verified: true,
                },
            },
        ],
        selectedCategory: 'Villas',
        setSelectedCategory: jest.fn(),
        getPropertiesByCategory: jest.fn(() => []),
        toggleFavorite: jest.fn(),
        favorites: [],
    }),
}));

const renderDiscovery = () => {
    return render(
        <BrowserRouter>
            <Discovery />
        </BrowserRouter>
    );
};

describe('Discovery Component', () => {
    test('renders header with Immob logo', () => {
        renderDiscovery();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders search bar', () => {
        renderDiscovery();
        expect(screen.getByPlaceholderText(/Recherchez une destination/i)).toBeInTheDocument();
    });

    test('renders category navigation', () => {
        renderDiscovery();
        expect(screen.getByText(/Villas/i)).toBeInTheDocument();
    });

    test('renders filter button', () => {
        renderDiscovery();
        expect(screen.getByText(/Filtres/i)).toBeInTheDocument();
    });

    test('renders host link', () => {
        renderDiscovery();
        expect(screen.getByText(/Devenir Hôte/i)).toBeInTheDocument();
    });
});
