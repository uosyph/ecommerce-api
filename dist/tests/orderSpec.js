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
    it('All methods should be defined', () => {
        expect(storeorder.show).toBeDefined();
        expect(storeorder.create).toBeDefined();
        expect(storeorder.delete).toBeDefined();
        expect(storeorder.update).toBeDefined();
    });
    it('create method should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.create({
            status: true,
            user_id: 24,
            product_id: [1],
            quantity: [1]
        });
        expect(result).toBeDefined();
    }));
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.show('1');
        expect(result === null || result === void 0 ? void 0 : result.id).toEqual(1);
    }));
    it('update method should update order\'s status', () => __awaiter(void 0, void 0, void 0, function* () {
        storeorder.update('1');
        const result = yield storeorder.show('1');
        expect(result === null || result === void 0 ? void 0 : result.status).toEqual(true);
    }));
    it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
        storeorder.delete('1');
        const result = yield storeorder.show('1');
        expect(result).toBeFalsy();
    }));
});
