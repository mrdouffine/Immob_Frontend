import { create } from 'zustand';
import { Property } from '../../data/properties';
import { sampleProperties } from '../data/sampleProperties';

interface PropertyState {
    properties: Property[];
    favorites: string[];
    isLoading: boolean;
    error: string | null;
    selectedCategory: string;

    setProperties: (properties: Property[]) => void;
    setSelectedCategory: (category: string) => void;
    getPropertyById: (id: string) => Property | undefined;
    getPropertiesByCategory: (category: string) => Property[];
    toggleFavorite: (propertyId: string) => void;
    searchProperties: (query: string) => Property[];
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
    properties: sampleProperties,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    isLoading: false,
    error: null,
    selectedCategory: 'Villas',

    setProperties: (properties) => set({ properties }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    getPropertyById: (id) => {
        return get().properties.find(p => p.id === id);
    },

    getPropertiesByCategory: (category) => {
        const { properties } = get();
        if (category === 'Tous') return properties;
        return properties.filter(p => p.category === category);
    },

    toggleFavorite: (propertyId) => {
        const favorites = get().favorites;
        const newFavorites = favorites.includes(propertyId)
            ? favorites.filter(id => id !== propertyId)
            : [...favorites, propertyId];

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        set({ favorites: newFavorites });
    },

    searchProperties: (query) => {
        const { properties } = get();
        const lowerQuery = query.toLowerCase();
        return properties.filter(p =>
            p.loc.toLowerCase().includes(lowerQuery) ||
            p.desc.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    },
}));
