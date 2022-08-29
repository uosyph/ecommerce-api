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
const order = new order_1.StoreOrder();
describe('Order Module', () => {
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });
    it('Index method should return a list of Orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.index();
        expect(result).toEqual([]);
    }));
});
