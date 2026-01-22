import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManageListings from '../../pages/ManageListings';

const renderManageListings = () => {
    return render(
        <BrowserRouter>
            <ManageListings />
        </BrowserRouter>
    );
};

describe('ManageListings Component', () => {
    test('renders manage listings header', () => {
        renderManageListings();
        expect(screen.getByText(/Vos annonces/i)).toBeInTheDocument();
    });

    test('displays description text', () => {
        renderManageListings();
        expect(screen.getByText(/Gérez vos propriétés et leurs disponibilités/i)).toBeInTheDocument();
    });

    test('renders create listing button in header', () => {
        renderManageListings();
        expect(screen.getByRole('button', { name: /Créer une annonce/i })).toBeInTheDocument();
    });

    test('displays empty state message', () => {
        renderManageListings();
        expect(screen.getByText(/Aucune annonce pour le moment/i)).toBeInTheDocument();
    });

    test('displays empty state description', () => {
        renderManageListings();
        expect(screen.getByText(/Commencez à gagner des revenus/i)).toBeInTheDocument();
    });

    test('renders create first listing button', () => {
        renderManageListings();
        expect(screen.getByRole('button', { name: /Créer ma première annonce/i })).toBeInTheDocument();
    });
});
