import express, { Request, Response } from 'express';
import { Order, StoreOrder } from '../models/order';
import { verifyToken } from '../middleware/auth';

const order_route = express.Router();
const storeorder = new StoreOrder();

order_route.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const Order = await storeorder.show(req.body.id);
        res.json(Order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

order_route.post('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: true,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const newOrder = await storeorder.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
});

order_route.delete('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const deleted = await storeorder.delete(req.body.id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

order_route.post('/done', verifyToken, async (req: Request, res: Response) => {
    try {
        const updated = await storeorder.update(req.body.id);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
});

export default order_route;
