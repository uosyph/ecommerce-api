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
const product_1 = require("../models/product");
const storeproduct = new product_1.StoreProduct();
describe('Product Module', () => {
    it('All methods should be defined', () => {
        expect(storeproduct.index).toBeDefined();
        expect(storeproduct.show).toBeDefined();
        expect(storeproduct.create).toBeDefined();
        expect(storeproduct.delete).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.create({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
        expect(result.id).toBeTruthy();
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.show('1');
        expect(result);
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.delete('1');
        expect(result).toBeFalsy();
    }));
});
