import express, { Request, Response } from 'express';
import { Order, StoreOrder } from '../models/order';
import { verifyToken } from '../middleware/auth';

const order = new StoreOrder();

const index = async (req: Request, res: Response) => {
    const orders = await order.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const Order = await order.show(req.params.id);
    res.json(Order);
};

const create = async (req: Request, res: Response) => {
    const ordr: Order = {
        user_id: req.body.user_id,
        status: true,
        quantity: 0,
        product_id: 0,
    };

    try {
        const newOrder = await order.create(ordr);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (req: Request, res: Response) => {
    const order_id: string = req.params.id;
    const product_id: string = req.params.prodId;
    const quantity: number = parseInt(req.params.qty);

    try {
        const addedProduct = await order.addProduct(
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
    const deleted = await order.delete(req.body.id);
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
