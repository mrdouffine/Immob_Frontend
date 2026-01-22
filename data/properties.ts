export interface Property {
    id: string;
    loc: string;
    desc: string;
    date: string;
    price: string;
    rate: string;
    img: string;
    category: string;
    details?: {
        guests: number;
        bedrooms: number;
        beds: number;
        baths: number;
        host: string;
        verified: boolean;
    };
}

// Import des données de démonstration
import { sampleProperties } from '../src/data/sampleProperties';

export const properties: Property[] = sampleProperties;

