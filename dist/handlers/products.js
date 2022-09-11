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
const product_1 = require("../models/product");
const auth_1 = require("../middleware/auth");
const product_route = express_1.default.Router();
const storeproduct = new product_1.StoreProduct();
// index method route
product_route.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield storeproduct.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// show method route
product_route.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = yield storeproduct.show(req.body.id);
        res.json(Product);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// create method route
product_route.post('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: (_a = req.body.category) !== null && _a !== void 0 ? _a : 'uncategorized',
        };
        const newProduct = yield storeproduct.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// delete route
product_route.delete('/', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield storeproduct.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
exports.default = product_route;
