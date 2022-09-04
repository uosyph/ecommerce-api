import client from '../database';

export type Product = {
    name: string;
    price: number;
    category: string;
};

export class StoreProduct {
    async index(): Promise<Product[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products...  ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await con.query(sql, [id]);

            con.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product id: ${id}...  ${err}`);
        }
    }

    async create(b: Product): Promise<Product> {
        try {
            const con = await client.connect();
            const sql =
                'INSERT INTO products (name, type, exp) VALUES($1, $2, $3) RETURNING *';
            const result = await con.query(sql, [b.name, b.category, b.price]);
            const prod = result.rows[0];

            con.release();

            return prod;
        } catch (err) {
            throw new Error(`Could not add new product: ${name}...  ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const con = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await con.query(sql, [id]);
            const prod = result.rows[0];

            con.release();

            return prod;
        } catch (err) {
            throw new Error(
                `Could not delete product id: ${id}... Error: ${err}`
            );
        }
    }
}
