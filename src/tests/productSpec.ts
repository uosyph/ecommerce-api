import { Product, StoreProduct } from '../models/product';

const product = new StoreProduct();

describe('Product Module', () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(product.delete).toBeDefined();
    });

    it('Index method should return a list of products', async () => {
        const result = await product.index();
        expect(result).toEqual([]);
    });
});
