import client from '../database';

export type Order = {
    [x: string]: any;
    id: number;
    quantity: number;
    status: boolean;
    product_id: number;
    user_id: number;
};

export class StoreOrder {
    async index(): Promise<Order[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders...  ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1);';
            const con = await client.connect();
            const result = await con.query(sql, [id]);

            con.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find Order id: ${id}...  ${err}`);
        }
    }

    async create(b: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (quantity, status, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *;';
            const con = await client.connect();
            const result = await con.query(sql, [
                b.quantity,
                b.status,
                b.product_id,
                b.user_id,
            ]);
            const ordr = result.rows[0];

            con.release();

            return ordr;
        } catch (err) {
            throw new Error(`Could not add new Order: ${name}...  ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1);';
            const con = await client.connect();
            const result = await con.query(sql, [id]);
            const ordr = result.rows[0];

            con.release();

            return ordr;
        } catch (err) {
            throw new Error(
                `Could not delete Order id: ${id}... Error: ${err}`
            );
        }
    }
}
