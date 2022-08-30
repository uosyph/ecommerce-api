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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const order = new order_1.StoreOrder();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order.index();
    res.json(orders);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Order = yield order.show(req.params.id);
    res.json(Order);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ordr = {
        user_id: req.body.user_id,
        status: true,
        quantity: 0,
        product_id: 0,
    };
    try {
        const newOrder = yield order.create(ordr);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = req.params.id;
    const product_id = req.params.prodId;
    const quantity = parseInt(req.params.qty);
    try {
        const addedProduct = yield order.addProduct(quantity, order_id, product_id);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const order_routes = (app) => {
    app.get('/orders', auth_1.verifyToken, index);
    app.get('/orders/:id', auth_1.verifyToken, show);
    app.post('/orders', auth_1.verifyToken, create);
    // app.delete('/orders', verifyToken, destroy);
    app.put('/orders/:id/products', addProduct);
};
exports.default = order_routes;
