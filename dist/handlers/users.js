"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const user_route = express_1.default.Router();
const storeuser = new user_1.StoreUser();
const pepper = process.env.TOKEN_SECRET;
user_route.get('/', auth_1.verifyToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield storeuser.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}));
user_route.get('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield storeuser.show(req.body.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}));
user_route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = yield storeuser.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, pepper);
        res.json(token);
        console.log(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
}));
user_route.post('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const usr = yield storeuser.auth(user.username, user.password);
        if (!usr) {
            res.status(401);
            return;
        }
        const token = jsonwebtoken_1.default.sign({ user: usr }, pepper);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        console.log(err);
    }
}));
user_route.delete('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield storeuser.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
exports.default = user_route;
