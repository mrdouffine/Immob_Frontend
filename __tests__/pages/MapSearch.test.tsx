import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MapSearch from '../../pages/MapSearch';

// Mock the store
jest.mock('../../src/store/propertyStore', () => ({
    usePropertyStore: () => ({
        properties: [
            {
                id: '1',
                loc: 'Test Location',
                desc: 'Test Property',
                price: '1000 €',
                rate: '4.9',
                category: 'Villas',
                img: 'test.jpg',
            },
        ],
    }),
}));

const renderMapSearch = () => {
    return render(
        <BrowserRouter>
            <MapSearch />
        </BrowserRouter>
    );
};

describe('MapSearch Component', () => {
    test('renders Immob logo', () => {
        renderMapSearch();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders price filter button', () => {
        renderMapSearch();
        expect(screen.getByText(/Prix/i)).toBeInTheDocument();
    });

    test('renders property type filter button', () => {
        renderMapSearch();
        expect(screen.getByText(/Type de logement/i)).toBeInTheDocument();
    });

    test('renders amenities filter button', () => {
        renderMapSearch();
        expect(screen.getByText(/Équipements/i)).toBeInTheDocument();
    });

    test('displays property results', () => {
        renderMapSearch();
        expect(screen.getByText(/logement/i)).toBeInTheDocument();
    });
});
