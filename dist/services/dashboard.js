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
    TopSoldProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to Get Top Products ${err}`);
            }
        });
    }
    SpecificTopSoldProducts(num) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT product_id, COUNT(product_id) AS TotalRepetitions FROM order_products GROUP BY product_id ORDER BY TotalRepetitions DESC LIMIT $1;';
                const result = yield conn.query(sql, [num]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to Get Top Products ${err}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
const dashboard = new DashboardQueries();
const TopSoldProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.TopSoldProducts();
    res.json(products);
});
const SpecificTopSoldProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield dashboard.SpecificTopSoldProducts(req.body.num);
    res.json(products);
});
const dashboard_routes = (app) => {
    app.get('/products/top/', TopSoldProducts);
    app.get('/products/top/:n', SpecificTopSoldProducts);
};
exports.default = dashboard_routes;
