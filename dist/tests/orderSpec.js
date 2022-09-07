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
const order_1 = require("../models/order");
const storeorder = new order_1.StoreOrder();
describe('Order Module', () => {
    it('should have an index method', () => {
        expect(storeorder.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(storeorder.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(storeorder.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(storeorder.delete).toBeDefined();
    });
    it('create method should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.create({
            status: true,
            user_id: 1,
        });
        expect(result).toEqual({
            status: true,
            user_id: 1,
        });
    }));
    it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.index();
        expect(result).toEqual([
            {
                status: true,
                user_id: 1,
            },
        ]);
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.show('1');
        expect(result).toEqual({
            status: true,
            user_id: 1,
        });
    }));
    it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
        storeorder.delete('1');
        const result = yield storeorder.index();
        expect(result).toEqual([]);
    }));
});
