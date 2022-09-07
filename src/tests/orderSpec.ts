import { StoreOrder } from '../models/order';

const storeorder = new StoreOrder();

describe('Order Module', () => {
    it('should have an index method', () => {
        expect(storeorder.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(storeorder.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(storeorder.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(storeorder.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        const result = await storeorder.create({
            status: true,
            user_id: 1,
        });
        expect(result).toEqual({
            status: true,
            user_id: 1,
        });
    });

    it('index method should return a list of orders', async () => {
        const result = await storeorder.index();
        expect(result).toEqual([
            {
                status: true,
                user_id: 1,
            },
        ]);
    });

    it('show method should return the correct order', async () => {
        const result = await storeorder.show('1');
        expect(result).toEqual({
            status: true,
            user_id: 1,
        });
    });

    it('delete method should remove the order', async () => {
        storeorder.delete('1');
        const result = await storeorder.index();

        expect(result).toEqual([]);
    });
});
