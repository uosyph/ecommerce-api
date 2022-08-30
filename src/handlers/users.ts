import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, StoreUser } from '../models/user';
import { verifyToken } from '../middleware/auth';

const user = new StoreUser();

const index = async (req: Request, res: Response) => {
    const users = await user.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const User = await user.show(req.body.id);
    res.json(User);
};

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: req.body.password,
        id: '',
    };

    try {
        jwt.verify(req.body.token, process.env.SECRET_TOKEN as string);
    } catch (err) {
        res.status(401);
        res.json('Invalid Token ${err}');
        return;
    }

    try {
        const newUser = await user.create(user);
        const token = jwt.sign(
            { user: newUser },
            process.env.SECRET_TOKEN as string
        );
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const auth = async (req: Request, res: Response) => {
    try {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
            id: '',
            firstName: '',
            secondName: '',
        };
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password,
        firstName: '',
        secondName: '',
    };

    try {
        const updated = await user.create(user);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json('${err}' + user);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await user.delete(req.body.id);
    res.json(deleted);
};

const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', verifyToken, create);
    app.delete('/users', verifyToken, destroy);
    app.use('/users/auth', auth);
};

export default user_routes;
