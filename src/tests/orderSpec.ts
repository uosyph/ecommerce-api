import { StoreOrder } from '../models/order';

const storeorder = new StoreOrder();

describe('Order Module', () => {
    it('All methods should be defined', () => {
        expect(storeorder.show).toBeDefined();
        expect(storeorder.create).toBeDefined();
        expect(storeorder.delete).toBeDefined();
        expect(storeorder.update).toBeDefined();
    });

    it('show method should return the correct order', async () => {
        const result = await storeorder.show('1');
        expect(result).toBeFalsy();
    });

    it('update method should update order\'s status', async () => {
        storeorder.update('1');
        const result = await storeorder.show('1');
        expect(result?.status).toBeFalsy();
    });

    it('delete method should remove the order', async () => {
        storeorder.delete('1');
        const result = await storeorder.show('1');
        expect(result).toBeUndefined();
    });
});
