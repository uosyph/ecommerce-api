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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const user = new user_1.StoreUser();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield user.show(req.body.id);
    res.json(User);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        password: req.body.password,
        id: '',
    };
    try {
        jsonwebtoken_1.default.verify(req.body.token, process.env.SECRET_TOKEN);
    }
    catch (err) {
        res.status(401);
        res.json('Invalid Token ${err}');
        return;
    }
    try {
        const newUser = yield user.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.SECRET_TOKEN);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            id: '',
            firstName: '',
            secondName: '',
        };
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.params.id,
        username: req.body.username,
        password: req.body.password,
        firstName: '',
        secondName: '',
    };
    try {
        const updated = yield user.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json('${err}' + user);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield user.delete(req.body.id);
    res.json(deleted);
});
const user_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', auth_1.verifyToken, create);
    app.delete('/users', auth_1.verifyToken, destroy);
    app.use('/users/auth', auth);
};
exports.default = user_routes;
