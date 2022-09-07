"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pepper = process.env.TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        if (!token) {
            res.status(401).send('No Token!');
            return;
        }
        jsonwebtoken_1.default.verify(token, pepper, (err, ok) => {
            const verified = ok;
            if (err)
                res.status(400);
            if (!verified)
                res.send('Bad Token!');
            else {
                res.locals.user = verified.user;
                next();
            }
        });
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyToken = verifyToken;
