import express, { Request, Response } from 'express';
import { Product, StoreProduct } from '../models/product';
import { verifyToken } from '../middleware/auth';

const storeproduct = new StoreProduct();

const index = async (_req: Request, res: Response) => {
    const products = await storeproduct.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const Product = await storeproduct.show(req.body.id);
    res.json(Product);
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };

        const newProduct = await storeproduct.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await storeproduct.delete(req.body.id);
    res.json(deleted);
};

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyToken, create);
    app.delete('/products', verifyToken, destroy);
};

export default product_routes;
