import { StoreUser } from '../models/user';

const storeuser = new StoreUser();

fdescribe('User Module', () => {
    it('should have an index method', () => {
        expect(storeuser.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(storeuser.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(storeuser.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(storeuser.delete).toBeDefined();
    });

    it('should have an authorization method', () => {
        expect(storeuser.auth).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await storeuser.create({
            username: 'testuser',
            password: 'password123',
        });
        expect(result).toBeTruthy();
    });

    it('index method should return a list of users', async () => {
        const result = await storeuser.index();
        expect(result.length > 0);
    });

    it('show method should return the correct user', async () => {
        const result = await storeuser.show('17');
        expect(result).toEqual({
            username: 'testuser',
            password: 'password123',
        });
    });

    it('delete method should remove the user', async () => {
        storeuser.delete('17');
        const result = await storeuser.index();

        expect(result).toEqual([]);
    });
});
