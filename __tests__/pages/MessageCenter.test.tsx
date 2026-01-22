import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MessageCenter from '../../pages/MessageCenter';

// Mock the stores
jest.mock('../../src/store/messageStore', () => ({
    useMessageStore: () => ({
        conversations: [
            {
                id: 'conv-1',
                propertyName: 'Villa Test',
                propertyImage: 'test.jpg',
                otherUserName: 'Test User',
                lastMessage: 'Test message',
                lastMessageTime: '2024-01-21T10:00:00',
                unreadCount: 1,
                messages: [
                    {
                        id: 'msg-1',
                        senderId: 'user-1',
                        senderName: 'Vous',
                        content: 'Hello',
                        timestamp: '2024-01-21T10:00:00',
                        read: true,
                    },
                ],
            },
        ],
        activeConversationId: null,
        setActiveConversation: jest.fn(),
        sendMessage: jest.fn(),
        markAsRead: jest.fn(),
    }),
}));

const renderMessageCenter = () => {
    return render(
        <BrowserRouter>
            <MessageCenter />
        </BrowserRouter>
    );
};

describe('MessageCenter Component', () => {
    test('renders Immob logo', () => {
        renderMessageCenter();
        expect(screen.getByText(/Immob/i)).toBeInTheDocument();
    });

    test('renders Messages header', () => {
        renderMessageCenter();
        expect(screen.getByText('Messages')).toBeInTheDocument();
    });

    test('displays search input', () => {
        renderMessageCenter();
        expect(screen.getByPlaceholderText(/Rechercher des messages/i)).toBeInTheDocument();
    });

    test('displays conversation list', () => {
        renderMessageCenter();
        expect(screen.getByText('Villa Test')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    test('displays unread count badge', () => {
        renderMessageCenter();
        const badges = screen.getAllByText('1');
        expect(badges.length).toBeGreaterThan(0);
    });

    test('shows empty state when no conversation selected', () => {
        renderMessageCenter();
        expect(screen.getByText(/Sélectionnez une conversation/i)).toBeInTheDocument();
    });
});
