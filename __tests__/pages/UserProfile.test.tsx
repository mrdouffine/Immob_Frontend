import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from '../../pages/UserProfile';

const renderUserProfile = () => {
    return render(
        <BrowserRouter>
            <UserProfile />
        </BrowserRouter>
    );
};

describe('UserProfile Component', () => {
    test('renders profile header', () => {
        renderUserProfile();
        expect(screen.getByText(/Mon Compte/i)).toBeInTheDocument();
    });

    test('renders logout button', () => {
        renderUserProfile();
        expect(screen.getByRole('button', { name: /Déconnexion/i })).toBeInTheDocument();
    });

    test('displays member status', () => {
        renderUserProfile();
        expect(screen.getByText(/Membre Immob/i)).toBeInTheDocument();
    });

    test('displays verification badge', () => {
        renderUserProfile();
        expect(screen.getByText(/Identité vérifiée/i)).toBeInTheDocument();
    });

    test('displays reviews count', () => {
        renderUserProfile();
        expect(screen.getByText(/0 avis reçus/i)).toBeInTheDocument();
    });

    test('displays personal info setting', () => {
        renderUserProfile();
        expect(screen.getByText(/Nom, e-mail et numéro/i)).toBeInTheDocument();
    });

    test('displays security setting', () => {
        renderUserProfile();
        expect(screen.getByText(/Mot de passe et authentification/i)).toBeInTheDocument();
    });

    test('displays payment setting', () => {
        renderUserProfile();
        expect(screen.getByText(/Gérer vos cartes de crédit/i)).toBeInTheDocument();
    });

    test('displays notification setting', () => {
        renderUserProfile();
        expect(screen.getByText(/Préférences de message/i)).toBeInTheDocument();
    });

    test('displays empty trips message', () => {
        renderUserProfile();
        expect(screen.getByText(/Aucun voyage prévu pour le moment/i)).toBeInTheDocument();
    });

    test('displays explore destinations button', () => {
        renderUserProfile();
        expect(screen.getByRole('button', { name: /Explorer les destinations/i })).toBeInTheDocument();
    });

    test('displays upcoming trips section header', () => {
        renderUserProfile();
        expect(screen.getByText(/Prochains voyages/i)).toBeInTheDocument();
    });

    test('displays profile settings section header', () => {
        renderUserProfile();
        expect(screen.getByText(/Paramètres du profil/i)).toBeInTheDocument();
    });
});
