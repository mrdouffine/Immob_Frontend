import { create } from 'zustand';

export interface Booking {
    id: string;
    propertyId: string;
    propertyName: string;
    propertyImage: string;
    propertyLocation: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    pricePerNight: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    hostName: string;
}

interface BookingState {
    bookings: Booking[];
    currentBooking: Booking | null;
    createBooking: (data: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
    cancelBooking: (bookingId: string) => void;
    getBookingById: (id: string) => Booking | undefined;
}

// Données de démonstration
const sampleBookings: Booking[] = [
    {
        id: 'booking-1',
        propertyId: 'villa-1',
        propertyName: 'Villa Moderne Saint-Tropez',
        propertyImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
        propertyLocation: 'Saint-Tropez, France',
        checkIn: '2024-06-15',
        checkOut: '2024-06-22',
        guests: 6,
        pricePerNight: 2500,
        totalPrice: 17500,
        status: 'confirmed',
        createdAt: '2024-01-15T10:00:00',
        hostName: 'Marie Dubois',
    },
    {
        id: 'booking-2',
        propertyId: 'beach-2',
        propertyName: 'Villa sur Pilotis Maldives',
        propertyImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400',
        propertyLocation: 'Maldives',
        checkIn: '2024-10-20',
        checkOut: '2024-10-27',
        guests: 2,
        pricePerNight: 5000,
        totalPrice: 35000,
        status: 'pending',
        createdAt: '2024-01-20T14:30:00',
        hostName: 'Ahmed Hassan',
    },
];

export const useBookingStore = create<BookingState>((set, get) => ({
    bookings: sampleBookings,
    currentBooking: null,

    createBooking: (data) => {
        const newBooking: Booking = {
            ...data,
            id: `booking-${Date.now()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };

        set(state => ({
            bookings: [...state.bookings, newBooking],
            currentBooking: newBooking,
        }));

        return newBooking;
    },

    cancelBooking: (bookingId) => {
        set(state => ({
            bookings: state.bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: 'cancelled' as const }
                    : booking
            ),
        }));
    },

    getBookingById: (id) => {
        return get().bookings.find(b => b.id === id);
    },
}));
