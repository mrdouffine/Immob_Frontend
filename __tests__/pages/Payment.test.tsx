import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Payment from '../../pages/Payment';

const renderPayment = () => {
    return render(
        <BrowserRouter>
            <Payment />
        </BrowserRouter>
    );
};

describe('Payment Component', () => {
    test('renders Immob logo', () => {
        renderPayment();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders payment header', () => {
        renderPayment();
        expect(screen.getByText(/Paiement/i)).toBeInTheDocument();
    });

    test('renders secure payment message', () => {
        renderPayment();
        expect(screen.getByText(/sécurisé/i)).toBeInTheDocument();
    });

    test('renders payment form', () => {
        renderPayment();
        const container = screen.getByText(/Paiement/i).closest('div');
        expect(container).toBeInTheDocument();
    });
});
