import { StoreOrder } from '../models/order';

const order = new StoreOrder();

describe('Order Module', () => {
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });

    it('Index method should return a list of Orders', async () => {
        const result = await order.index();
        expect(result).toEqual([]);
    });
});
