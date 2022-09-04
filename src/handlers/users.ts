import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, StoreUser } from '../models/user';
import { verifyToken } from '../middleware/auth';

const storeuser = new StoreUser();

const index = async (_req: Request, res: Response) => {
    const users = await storeuser.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const User = await storeuser.show(req.body.id);
    res.json(User);
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };

    // try {
    //     jwt.verify(req.body.token, process.env.SECRET_TOKEN as string);
    // } catch (err) {
    //     res.status(401);
    //     res.json('Invalid Token ${err}');
    //     return;
    // }

    try {
        const newUser = await storeuser.create(user);
        const token = jwt.sign({ user: newUser },process.env.SECRET_TOKEN as string);
        res.json(token);
        console.log(token);
    } catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
};

const auth = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        };
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const updated = await storeuser.create(user);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json('${err}' + user);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await storeuser.delete(req.body.id);
    res.json(deleted);
};

const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.put('/users', verifyToken, update);
    app.delete('/users', verifyToken, destroy);
    app.post('/users/auth', auth);
};

export default user_routes;
