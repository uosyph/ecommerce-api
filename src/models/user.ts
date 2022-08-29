import client from '../database';

export type User = {
    [x: string]: any;
    id: number;
    firstName: string;
    secondName: string;
    password: string;
};

export class StoreUser {
    async index(): Promise<User[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users...  ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const con = await client.connect();
            const result = await con.query(sql, [id]);

            con.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find User id: ${id}...  ${err}`);
        }
    }

    async create(b: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (firstName, secondName, password) VALUES($1, $2, $3) RETURNING *;';
            const con = await client.connect();
            const result = await con.query(sql, [
                b.firstName,
                b.secondName,
                b.password,
            ]);
            const usr = result.rows[0];

            con.release();

            return usr;
        } catch (err) {
            throw new Error(`Could not add new User: ${name}...  ${err}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1);';
            const con = await client.connect();
            const result = await con.query(sql, [id]);
            const usr = result.rows[0];

            con.release();

            return usr;
        } catch (err) {
            throw new Error(`Could not delete User id: ${id}... Error: ${err}`);
        }
    }
}
