import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HostDashboard from '../../pages/HostDashboard';

// Mock the stores
jest.mock('../../src/store/hostStore', () => ({
    useHostStore: () => ({
        stats: {
            totalRevenue: 45000,
            occupancyRate: 78,
            averageRating: 4.92,
            activeListings: 3,
            totalBookings: 24,
            pendingBookings: 2,
        },
        properties: [
            {
                id: 'prop-1',
                desc: 'Villa Test',
                loc: 'Test Location',
                price: '1000 €',
                img: 'test.jpg',
                bookings: 10,
                revenue: 10000,
            },
        ],
        upcomingArrivals: [
            {
                id: 'arrival-1',
                guestName: 'Test Guest',
                propertyName: 'Test Property',
                checkIn: '2024-02-15',
                guests: 2,
            },
        ],
    }),
}));

jest.mock('../../src/store/authStore', () => ({
    useAuthStore: () => ({
        user: { firstName: 'Test', lastName: 'User' },
    }),
}));

const renderHostDashboard = () => {
    return render(
        <BrowserRouter>
            <HostDashboard />
        </BrowserRouter>
    );
};

describe('HostDashboard Component', () => {
    test('renders Immob logo and title', () => {
        renderHostDashboard();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders dashboard title', () => {
        renderHostDashboard();
        expect(screen.getByText(/Tableau de bord de l'hôte/i)).toBeInTheDocument();
    });

    test('displays welcome message', () => {
        renderHostDashboard();
        expect(screen.getByText(/Bienvenue/i)).toBeInTheDocument();
    });

    test('displays revenue stat', () => {
        renderHostDashboard();
        expect(screen.getByText(/45 000 €/i)).toBeInTheDocument();
    });

    test('displays occupancy rate', () => {
        renderHostDashboard();
        expect(screen.getByText(/78%/i)).toBeInTheDocument();
    });

    test('displays average rating', () => {
        renderHostDashboard();
        // Use getAllByText since rating appears multiple times
        const ratings = screen.getAllByText(/4\.92/i);
        expect(ratings.length).toBeGreaterThan(0);
    });

    test('displays active listings count', () => {
        renderHostDashboard();
        const elements = screen.getAllByText('3');
        expect(elements.length).toBeGreaterThan(0);
    });

    test('displays properties section', () => {
        renderHostDashboard();
        expect(screen.getByText(/Vos Propriétés/i)).toBeInTheDocument();
    });

    test('displays upcoming arrivals section', () => {
        renderHostDashboard();
        expect(screen.getByText(/Prochaines arrivées/i)).toBeInTheDocument();
    });

    test('displays add listing button', () => {
        renderHostDashboard();
        expect(screen.getByText(/Ajouter une annonce/i)).toBeInTheDocument();
    });

    test('displays navigation links', () => {
        renderHostDashboard();
        expect(screen.getByText(/Mes Annonces/i)).toBeInTheDocument();
    });

    test('displays message badge', () => {
        renderHostDashboard();
        const badges = screen.getAllByText('3');
        expect(badges.length).toBeGreaterThan(0);
    });
});
