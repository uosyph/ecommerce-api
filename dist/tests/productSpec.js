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
    it('should have an index method', () => {
        expect(storeproduct.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(storeproduct.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(storeproduct.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(storeproduct.delete).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.create({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
        expect(result).toEqual({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.index();
        expect(result).toEqual([
            {
                name: 'testprod',
                price: 160,
                category: 'general',
            },
        ]);
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeproduct.show('1');
        expect(result).toEqual({
            name: 'testprod',
            price: 160,
            category: 'general',
        });
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        storeproduct.delete('1');
        const result = yield storeproduct.index();
        expect(result).toEqual([]);
    }));
});
