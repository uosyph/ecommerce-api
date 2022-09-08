import { StoreOrder } from '../models/order';

const storeorder = new StoreOrder();

describe('Order Module', () => {
    it('All methods should be defined', () => {
        expect(storeorder.show).toBeDefined();
        expect(storeorder.create).toBeDefined();
        expect(storeorder.delete).toBeDefined();
        expect(storeorder.update).toBeDefined();
    });

    it('create method should create a new order', async () => {
        const result = await storeorder.create({
            status: true,
            user_id: 24,
            product_id: [1],
            quantity: [1]
        });
        expect(result).toBeDefined();
    });

    it('show method should return the correct order', async () => {
        const result = await storeorder.show('1');
        expect(result?.id).toEqual(1);
    });

    it('update method should update order\'s status', async () => {
        storeorder.update('1');
        const result = await storeorder.show('1');
        expect(result?.status).toEqual(true);
    });

    it('delete method should remove the order', async () => {
        storeorder.delete('1');
        const result = await storeorder.show('1');
        expect(result).toBeFalsy();
    });
});
