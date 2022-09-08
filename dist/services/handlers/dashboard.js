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
const dashboard_1 = require("../models/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const topSoldProds = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.topSoldProds();
    res.json(products);
});
const specificTopSoldProds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.specificTopSoldProds(req.body.prods);
    res.json(products);
});
const filterByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.filterByCategory(req.body.category);
    res.json(products);
});
const dashboard_routes = (app) => {
    app.get('/top-products', topSoldProds);
    app.get('/top-products/:n', specificTopSoldProds);
    app.get('/filter-by-category', filterByCategory);
};
exports.default = dashboard_routes;
