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
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
describe('Dashboard Services', () => {
    it('Should have TopSoldProducts Method', () => {
        expect(dashboard.TopSoldProducts).toBeDefined();
    });
    it('Should have SpecificTopSoldProducts Method', () => {
        expect(dashboard.SpecificTopSoldProducts).toBeDefined();
    });
    it('TopSoldProducts method should return a list of top sold products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.TopSoldProducts();
        expect(result).toEqual([]);
    }));
    it('SpecificTopSoldProducts method should return a list of top 5 sold products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.SpecificTopSoldProducts(5);
        expect(result).toEqual([]);
    }));
});
