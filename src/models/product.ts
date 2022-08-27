import client from "../database";

export type Product = {
    id: Number;
    name: String;
    type: String;
    exp: String;
    mfd: String;
}

export class ProductSore {
    async index(): Promise<Product[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM store;'
            const result = await con.query(sql);
            con.release();
            return result.rows
        }
        catch(err) {
            throw new Error('${err}');
        }
    }
}