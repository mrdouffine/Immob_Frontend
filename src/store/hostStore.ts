import { create } from 'zustand';
import { Property } from '../../data/properties';

export interface HostStats {
    totalRevenue: number;
    occupancyRate: number;
    averageRating: number;
    activeListings: number;
    totalBookings: number;
    pendingBookings: number;
}

export interface HostProperty extends Property {
    bookings: number;
    revenue: number;
    isActive: boolean;
    views: number;
    clicks: number;
    conversionRate: number;
    lastMonthViews: number;
    viewsGrowth: number;
}

interface HostState {
    stats: HostStats;
    properties: HostProperty[];
    upcomingArrivals: Array<{
        id: string;
        guestName: string;
        propertyName: string;
        checkIn: string;
        guests: number;
    }>;
}

// Données de démonstration pour un hôte
const sampleHostData: HostState = {
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
            id: 'host-prop-1',
            loc: 'Saint-Tropez, France',
            desc: 'Villa Moderne avec Vue Mer',
            date: 'Disponible',
            price: '2 500 €',
            rate: '4,95',
            category: 'Villas',
            img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            details: {
                guests: 8,
                bedrooms: 4,
                beds: 5,
                baths: 4,
                host: 'Vous',
                verified: true,
            },
            bookings: 12,
            revenue: 30000,
            isActive: true,
            views: 2450,
            clicks: 856,
            conversionRate: 4.9,
            lastMonthViews: 2100,
            viewsGrowth: 16.7,
        },
        {
            id: 'host-prop-2',
            loc: 'Cannes, France',
            desc: 'Appartement Vue Mer Croisette',
            date: 'Disponible',
            price: '800 €',
            rate: '4,88',
            category: 'Bord de mer',
            img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            details: {
                guests: 4,
                bedrooms: 2,
                beds: 2,
                baths: 2,
                host: 'Vous',
                verified: true,
            },
            bookings: 8,
            revenue: 12000,
            isActive: true,
            views: 1820,
            clicks: 623,
            conversionRate: 4.4,
            lastMonthViews: 1650,
            viewsGrowth: 10.3,
        },
        {
            id: 'host-prop-3',
            loc: 'Nice, France',
            desc: 'Studio Moderne Centre-Ville',
            date: 'Disponible',
            price: '350 €',
            rate: '4,75',
            category: 'Design',
            img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            details: {
                guests: 2,
                bedrooms: 1,
                beds: 1,
                baths: 1,
                host: 'Vous',
                verified: true,
            },
            bookings: 4,
            revenue: 3000,
            isActive: true,
            views: 980,
            clicks: 312,
            conversionRate: 4.1,
            lastMonthViews: 850,
            viewsGrowth: 15.3,
        },
    ],
    upcomingArrivals: [
        {
            id: 'arrival-1',
            guestName: 'Sophie Martin',
            propertyName: 'Villa Moderne Saint-Tropez',
            checkIn: '2024-02-15',
            guests: 6,
        },
        {
            id: 'arrival-2',
            guestName: 'Pierre Durand',
            propertyName: 'Appartement Cannes',
            checkIn: '2024-02-18',
            guests: 4,
        },
        {
            id: 'arrival-3',
            guestName: 'Marie Leclerc',
            propertyName: 'Studio Nice',
            checkIn: '2024-02-20',
            guests: 2,
        },
    ],
};

export const useHostStore = create<HostState>(() => sampleHostData);
