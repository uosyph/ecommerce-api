import { StoreProduct } from '../models/product';

const storeproduct = new StoreProduct();

describe('Product Module', () => {
    it('should have an index method', () => {
        expect(storeproduct.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(storeproduct.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(storeproduct.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(storeproduct.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await storeproduct.create({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
        expect(result).toEqual({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await storeproduct.index();
        expect(result).toEqual([
            {
                name: 'testprod',
                price: 160,
                category: 'general',
            },
        ]);
    });

    it('show method should return the correct product', async () => {
        const result = await storeproduct.show('1');
        expect(result).toEqual({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
    });

    it('delete method should remove the product', async () => {
        storeproduct.delete('1');
        const result = await storeproduct.index();

        expect(result).toEqual([]);
    });
});
