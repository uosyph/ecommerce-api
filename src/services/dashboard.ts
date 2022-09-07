import express, { Request, Response } from 'express';
import client from '../database';

class DashboardQueries {
    async TopSoldProducts(): Promise<DashboardQueries[]> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC;';

            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get Top Products ${err}`);
        }
    }

    async SpecificTopSoldProducts(num: number): Promise<DashboardQueries[]> {
        try {
            const conn = await client.connect();
            const sql =
                'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC LIMIT $1;';

            const result = await conn.query(sql, [num]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to Get Top Products ${err}`);
        }
    }
}

const dashboard = new DashboardQueries();

const TopSoldProducts = async (_req: Request, res: Response) => {
    const products = await dashboard.TopSoldProducts();
    res.json(products);
};

const SpecificTopSoldProducts = async (req: Request, res: Response) => {
    const products = await dashboard.SpecificTopSoldProducts(req.body.prods);
    res.json(products);
};

const dashboard_routes = (app: express.Application) => {
    app.get('/top-products', TopSoldProducts);
    app.get('/top-products/:n', SpecificTopSoldProducts);
};

export { DashboardQueries };
export default dashboard_routes;
