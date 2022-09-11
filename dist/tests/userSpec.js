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
const user_1 = require("../models/user");
const storeuser = new user_1.StoreUser();
describe('User Module', () => {
    it('All methods should be defined', () => {
        expect(storeuser.index).toBeDefined();
        expect(storeuser.show).toBeDefined();
        expect(storeuser.create).toBeDefined();
        expect(storeuser.delete).toBeDefined();
        expect(storeuser.auth).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.create({
            username: 'testuser',
            password: 'password123',
        });
        expect(result.id).toBeTruthy();
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.show('1');
        expect(result === null || result === void 0 ? void 0 : result.id);
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.delete('1');
        expect(result).toBeFalsy();
    }));
    it('auth method should authorize the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.auth('testuser', 'password123');
        expect(result).toBeDefined();
    }));
});
