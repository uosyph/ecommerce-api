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
exports.StoreUser = void 0;
const database_1 = __importDefault(require("../database"));
class StoreUser {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM users;';
                const result = yield con.query(sql);
                con.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users...  ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1);';
                const con = yield database_1.default.connect();
                const result = yield con.query(sql, [id]);
                con.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find User id: ${id}...  ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (firstName, secondName, password) VALUES($1, $2, $3) RETURNING *;';
                const con = yield database_1.default.connect();
                const result = yield con.query(sql, [b.firstName, b.secondName, b.password]);
                const usr = result.rows[0];
                con.release();
                return usr;
            }
            catch (err) {
                throw new Error(`Could not add new User: ${name}...  ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1);';
                const con = yield database_1.default.connect();
                const result = yield con.query(sql, [id]);
                const usr = result.rows[0];
                con.release();
                return usr;
            }
            catch (err) {
                throw new Error(`Could not delete User id: ${id}... Error: ${err}`);
            }
        });
    }
}
exports.StoreUser = StoreUser;
