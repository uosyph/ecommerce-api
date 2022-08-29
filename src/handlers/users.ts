import express, { Request, Response } from 'express';
import { User, StoreUser } from '../models/user';

const user = new StoreUser();

const index = async (_req: Request, res: Response) => {
    const users = await user.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const User = await user.show(req.body.id);
    res.json(User);
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            password: req.body.password,
            id: 0,
        };

        const newUser = await user.create(user);
        res.json(newUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await user.delete(req.body.id);
    res.json(deleted);
};

const users_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users', destroy);
};

export default users_routes;
