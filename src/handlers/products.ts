import express, { Request, Response } from 'express';
import { Product, StoreProduct } from '../models/product';
import { verifyToken } from '../middleware/auth';

const product = new StoreProduct();

const index = async (_req: Request, res: Response) => {
    const products = await product.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const Product = await product.show(req.body.id);
    res.json(Product);
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            id: '',
        };

        const newProduct = await product.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await product.delete(req.body.id);
    res.json(deleted);
};

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyToken, create);
    app.delete('/products', verifyToken, destroy);
};

export default product_routes;
