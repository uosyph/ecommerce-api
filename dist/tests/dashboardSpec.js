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
    it('All methods should be defined', () => {
        expect(dashboard.topSoldProds).toBeDefined();
        expect(dashboard.specificTopSoldProds).toBeDefined();
        expect(dashboard.filterByCategory).toBeDefined();
    });
    it('topSoldProducts method should return a list of top sold products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.topSoldProds();
        expect(result.length > 0);
    }));
    it('specificTopSoldProducts method should return a list of top 5 sold products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.specificTopSoldProds(5);
        expect(result.length > 0);
    }));
    it('filterByCategory method should filter products by category', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dashboard.filterByCategory('general');
        expect(result.length > 0);
    }));
});
