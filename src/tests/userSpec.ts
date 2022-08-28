import { User, StoreUser } from '../models/user'

const user = new StoreUser();

describe('User Module', () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });

    it('Index method should return a list of Users', async () => {
        const result = await user.index();
        expect(result).toEqual([]);
    });
});
