import express, { Request, Response } from 'express';
import { Order, StoreOrder } from '../models/order';

const order = new StoreOrder();

const index = async (_req: Request, res: Response) => {
    const orders = await order.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const Order = await order.show(req.body.id);
    res.json(Order);
};

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            quantity: req.body.user_id,
            status: req.body.status,
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            id: 0,
        };

        const newOrder = await order.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await order.delete(req.body.id);
    res.json(deleted);
};

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.delete('/orders', destroy);
};

export default order_routes;
