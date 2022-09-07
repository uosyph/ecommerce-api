import { StoreUser } from '../models/user';

const storeuser = new StoreUser();

describe('User Module', () => {
    it('All methods should be defined', () => {
        expect(storeuser.index).toBeDefined();
        expect(storeuser.show).toBeDefined();
        expect(storeuser.create).toBeDefined();
        expect(storeuser.delete).toBeDefined();
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
        const result = await storeuser.show('1');
        expect(result).toBeDefined;
    });

    it('delete method should remove the user', async () => {
        storeuser.delete('1');
        const result = await storeuser.show('1');
        expect(result).toBeFalsy();
    });
});
