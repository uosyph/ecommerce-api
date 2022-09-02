import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ')[1] : '';
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

        next();
    } catch (error) {
        res.status(401);
    }
};
