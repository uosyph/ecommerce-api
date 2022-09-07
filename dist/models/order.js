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
exports.StoreOrder = void 0;
const database_1 = __importDefault(require("../database"));
class StoreOrder {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders;';
                const result = yield con.query(sql);
                con.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders...  ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1);';
                const result = yield con.query(sql, [id]);
                con.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find Order id: ${id}...  ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;';
                const result = yield con.query(sql, [b.status, b.user_id]);
                const ordr = result.rows[0];
                con.release();
                return ordr;
            }
            catch (err) {
                throw new Error(`Could not add new Order: ${name}...  ${err}`);
            }
        });
    }
    addProduct(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSER INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
                const result = yield con.query(sql, [
                    quantity,
                    order_id,
                    product_id,
                ]);
                const order = result.rows[0];
                con.release();
                return order;
            }
            catch (err) {
                throw new Error('Could not add Product: ${product_id} to Order {order_id}...  ${err}');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1);';
                const result = yield con.query(sql, [id]);
                const ordr = result.rows[0];
                con.release();
                return ordr;
            }
            catch (err) {
                throw new Error(`Could not delete Order id: ${id}... Error: ${err}`);
            }
        });
    }
}
exports.StoreOrder = StoreOrder;
