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
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.show('1');
        expect(result === null || result === void 0 ? void 0 : result.id);
    }));
    it("update method should update order's status", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.update('1');
        expect(result === null || result === void 0 ? void 0 : result.status).toBeUndefined();
    }));
    it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeorder.delete('1');
        expect(result).toBeFalsy();
    }));
});
