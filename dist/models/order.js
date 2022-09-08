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
                throw new Error(`Could not find Order ${id}...  ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *;';
                const result = yield con.query(sql, [o.status, o.user_id]);
                const ordr = result.rows[0];
                const ordered = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;';
                const odResult = yield con.query(ordered, [ordr.id, o.product_id, o.quantity]);
                const ordrd = odResult.rows[0];
                con.release();
                return ordrd;
            }
            catch (err) {
                throw new Error(`Could not create new order...  ${err}`);
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
                throw new Error(`Could not delete Order ${id}... ${err}`);
            }
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status=false WHERE id=($1)';
                const result = yield con.query(sql, [id]);
                const ordr = result.rows[0];
                con.release();
                return ordr;
            }
            catch (err) {
                throw new Error(`Could not update order ${id}'s status... ${err}`);
            }
        });
    }
}
exports.StoreOrder = StoreOrder;
