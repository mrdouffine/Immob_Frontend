import { create } from 'zustand';

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    timestamp: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    propertyId: string;
    propertyName: string;
    propertyImage: string;
    otherUserId: string;
    otherUserName: string;
    otherUserAvatar?: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: Message[];
}

interface MessageState {
    conversations: Conversation[];
    activeConversationId: string | null;
    setActiveConversation: (id: string) => void;
    sendMessage: (conversationId: string, content: string) => void;
    markAsRead: (conversationId: string) => void;
}

// Données de démonstration
const sampleConversations: Conversation[] = [
    {
        id: 'conv-1',
        propertyId: 'villa-1',
        propertyName: 'Villa Moderne Saint-Tropez',
        propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
        otherUserId: 'host-1',
        otherUserName: 'Marie Dubois',
        lastMessage: 'La villa est disponible pour ces dates !',
        lastMessageTime: '2024-01-21T14:30:00',
        unreadCount: 2,
        messages: [
            {
                id: 'msg-1',
                conversationId: 'conv-1',
                senderId: 'user-1',
                senderName: 'Vous',
                content: 'Bonjour, la villa est-elle disponible du 15 au 22 juin ?',
                timestamp: '2024-01-21T10:00:00',
                read: true,
            },
            {
                id: 'msg-2',
                conversationId: 'conv-1',
                senderId: 'host-1',
                senderName: 'Marie Dubois',
                content: 'Bonjour ! Oui, la villa est disponible pour ces dates.',
                timestamp: '2024-01-21T10:15:00',
                read: true,
            },
            {
                id: 'msg-3',
                conversationId: 'conv-1',
                senderId: 'host-1',
                senderName: 'Marie Dubois',
                content: 'La villa est disponible pour ces dates !',
                timestamp: '2024-01-21T14:30:00',
                read: false,
            },
        ],
    },
    {
        id: 'conv-2',
        propertyId: 'beach-1',
        propertyName: 'Maison Blanche Santorin',
        propertyImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
        otherUserId: 'host-2',
        otherUserName: 'Nikos Papadopoulos',
        lastMessage: 'Merci pour votre intérêt !',
        lastMessageTime: '2024-01-20T16:45:00',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-4',
                conversationId: 'conv-2',
                senderId: 'user-1',
                senderName: 'Vous',
                content: 'Bonjour, y a-t-il une vue sur la Caldera ?',
                timestamp: '2024-01-20T16:00:00',
                read: true,
            },
            {
                id: 'msg-5',
                conversationId: 'conv-2',
                senderId: 'host-2',
                senderName: 'Nikos Papadopoulos',
                content: 'Oui, la vue est magnifique ! Merci pour votre intérêt !',
                timestamp: '2024-01-20T16:45:00',
                read: true,
            },
        ],
    },
];

export const useMessageStore = create<MessageState>((set, get) => ({
    conversations: sampleConversations,
    activeConversationId: null,

    setActiveConversation: (id) => set({ activeConversationId: id }),

    sendMessage: (conversationId, content) => {
        // Rate limiting
        const { messageLimiter } = require('../utils/rateLimiter');
        const { messageSchema, sanitizeString } = require('../utils/validation');

        if (!messageLimiter.canProceed('sendMessage')) {
            const timeUntilReset = Math.ceil(messageLimiter.getTimeUntilReset('sendMessage') / 1000);
            throw new Error(`Trop de messages envoyés. Veuillez attendre ${timeUntilReset} secondes.`);
        }

        // Validation
        const validation = messageSchema.safeParse({ content });
        if (!validation.success) {
            throw new Error(validation.error.errors[0]?.message || 'Message invalide');
        }

        // Sanitize le contenu
        const sanitizedContent = sanitizeString(content.trim());

        if (!sanitizedContent) {
            throw new Error('Le message ne peut pas être vide');
        }

        const conversations = get().conversations;
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            conversationId,
            senderId: 'user-1',
            senderName: 'Vous',
            content: sanitizedContent,
            timestamp: new Date().toISOString(),
            read: true,
        };

        const updatedConversations = conversations.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                    lastMessage: sanitizedContent,
                    lastMessageTime: newMessage.timestamp,
                };
            }
            return conv;
        });

        set({ conversations: updatedConversations });
    },

    markAsRead: (conversationId) => {
        const conversations = get().conversations;
        const updatedConversations = conversations.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    unreadCount: 0,
                    messages: conv.messages.map(msg => ({ ...msg, read: true })),
                };
            }
            return conv;
        });

        set({ conversations: updatedConversations });
    },
}));
