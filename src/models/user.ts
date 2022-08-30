import bcrypt from 'bcrypt';
import client from '../database';

export type User = {
    [x: string]: any;
    id?: string;
    username: string;
    firstName: string;
    secondName: string;
    password: string;
};

const pepper: string = process.env.BYCRT_PASSWORD as string;
const salt: string = process.env.SALT_ROUNDS as string;

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
            const con = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await con.query(sql, [id]);

            con.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find User id: ${id}...  ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const con = await client.connect();
            const sql =
                'INSERT INTO users (username, firstName, secondName, password) VALUES($1, $2, $3, $4) RETURNING *;';

            const hashedPW = bcrypt.hashSync(
                u.password + pepper,
                parseInt(salt)
            );

            const result = await con.query(sql, [
                u.username,
                u.firstName,
                u.secondName,
                hashedPW,
            ]);

            const usr = result.rows[0];

            con.release();

            return usr;
        } catch (err) {
            throw new Error(`Could not add new User ${u.username}...  ${err}`);
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const con = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1);';
            const result = await con.query(sql, [id]);
            const usr = result.rows[0];

            con.release();

            return usr;
        } catch (err) {
            throw new Error(`Could not delete User id: ${id}... Error: ${err}`);
        }
    }

    async auth(username: string, password: string): Promise<User | null> {
        const con = await client.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const result = await con.query(sql, [username]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }
        }

        return null;
    }
}
