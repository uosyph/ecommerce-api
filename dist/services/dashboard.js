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
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    topSoldProds() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC;';
                const result = yield con.query(sql);
                con.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get top products...  ${err}`);
            }
        });
    }
    specificTopSoldProds(num) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC LIMIT $1;';
                const result = yield con.query(sql, [num]);
                con.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get top products...  ${err}`);
            }
        });
    }
    filterByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE category=($1)';
                const result = yield con.query(sql, [category]);
                con.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to list products by category...  ${err}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
const dashboard = new DashboardQueries();
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
