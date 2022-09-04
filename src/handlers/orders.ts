import express, { Request, Response } from 'express';
import { Order, StoreOrder } from '../models/order';
import { verifyToken } from '../middleware/auth';

const storeorder = new StoreOrder();

const index = async (_req: Request, res: Response) => {
    const orders = await storeorder.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const Order = await storeorder.show(req.params.id);
    res.json(Order);
};

const create = async (req: Request, res: Response) => {
    const ordr: Order = {
        user_id: req.body.user_id,
        status: true,
    };

    try {
        const newOrder = await storeorder.create(ordr);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
    const order_id = req.body.id;
    const product_id = req.body.prodId;
    const quantity = parseInt(req.body.qty);

    try {
        const addedProduct = await storeorder.addProduct(
            quantity,
            order_id,
            product_id
        );
        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await storeorder.delete(req.body.id);
    res.json(deleted);
};

const order_routes = (app: express.Application) => {
    app.get('/orders', verifyToken, index);
    app.get('/orders/:id', verifyToken, show);
    app.post('/orders', verifyToken, create);
    app.delete('/orders', verifyToken, destroy);
    app.put('/orders/:id/products', addProduct);
};

export default order_routes;
