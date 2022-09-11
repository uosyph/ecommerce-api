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
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const order_route = express_1.default.Router();
const storeorder = new order_1.StoreOrder();
// show method route
order_route.get('/:id', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Order = yield storeorder.show(req.body.id);
        res.json(Order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}));
// create method route
order_route.post('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: req.body.user_id,
            status: true,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const newOrder = yield storeorder.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
        console.log(err);
    }
}));
// delete route
order_route.delete('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield storeorder.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}));
// update method route
order_route.post('/done', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield storeorder.update(req.body.id);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}));
exports.default = order_route;
