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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const pepper = process.env.BYCRT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
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
                const con = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1);';
                const result = yield con.query(sql, [id]);
                con.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find User ${id}: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *;';
                const hashedPW = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
                const result = yield con.query(sql, [u.username, hashedPW]);
                con.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add new User ${u.username}...  ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const con = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1);';
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
    auth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = yield con.query(sql, [username]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.StoreUser = StoreUser;
