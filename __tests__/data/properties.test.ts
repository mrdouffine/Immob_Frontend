import { properties, Property } from '../../data/properties';

describe('Properties Data', () => {
    test('properties array should be defined', () => {
        expect(properties).toBeDefined();
    });

    test('properties array should be an array', () => {
        expect(Array.isArray(properties)).toBe(true);
    });

    test('each property should have required fields', () => {
        properties.forEach((property: Property) => {
            expect(property).toHaveProperty('id');
            expect(property).toHaveProperty('loc');
            expect(property).toHaveProperty('desc');
            expect(property).toHaveProperty('date');
            expect(property).toHaveProperty('price');
            expect(property).toHaveProperty('rate');
            expect(property).toHaveProperty('img');
            expect(property).toHaveProperty('category');
        });
    });

    test('property IDs should be unique', () => {
        const ids = properties.map(p => p.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    test('property rates should be valid numbers', () => {
        properties.forEach((property: Property) => {
            const rate = parseFloat(property.rate.replace(',', '.'));
            expect(rate).toBeGreaterThanOrEqual(0);
            expect(rate).toBeLessThanOrEqual(5);
        });
    });

    test('property images should have valid URLs', () => {
        properties.forEach((property: Property) => {
            expect(property.img).toMatch(/^https?:\/\//);
        });
    });
});
