import express, { Request, Response } from 'express';
import client from '../database';

class DashboardQueries {
    async topSoldProds(): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC;';

            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to get top products...  ${err}`);
        }
    }

    async specificTopSoldProds(num: number): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC LIMIT $1;';

            const result = await con.query(sql, [num]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to get top products...  ${err}`);
        }
    }

    async filterByCategory(category: string): Promise<DashboardQueries[]> {
        try {
            const con = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await con.query(sql, [category]);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to list products by category...  ${err}`);
        }
    }
}

const dashboard = new DashboardQueries();

const topSoldProds = async (_req: Request, res: Response) => {
    const products = await dashboard.topSoldProds();
    res.json(products);
};

const specificTopSoldProds = async (req: Request, res: Response) => {
    const products = await dashboard.specificTopSoldProds(req.body.prods);
    res.json(products);
};

const filterByCategory = async (req: Request, res: Response) => {
    const products = await dashboard.filterByCategory(req.body.category);
    res.json(products);
};

const dashboard_routes = (app: express.Application) => {
    app.get('/top-products', topSoldProds);
    app.get('/top-products/:n', specificTopSoldProds);
    app.get('/filter-by-category', filterByCategory);
};

export { DashboardQueries };
export default dashboard_routes;
