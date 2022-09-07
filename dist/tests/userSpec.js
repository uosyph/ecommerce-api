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
fdescribe('User Module', () => {
    it('should have an index method', () => {
        expect(storeuser.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(storeuser.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(storeuser.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(storeuser.delete).toBeDefined();
    });
    it('should have an authorization method', () => {
        expect(storeuser.auth).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.create({
            username: 'testuser',
            password: 'password123',
        });
        expect(result).toEqual({
            username: 'testuser',
            password: 'password123',
        });
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.index();
        expect(result).toEqual([
            {
                username: 'testuser',
                password: 'password123',
            },
        ]);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeuser.show('17');
        expect(result).toEqual({
            username: 'testuser',
            password: 'password123',
        });
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        storeuser.delete('17');
        const result = yield storeuser.index();
        expect(result).toEqual([]);
    }));
});
