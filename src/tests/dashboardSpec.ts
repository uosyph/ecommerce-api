import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries;

describe('Dashboard Services', () => {
    it('Should have TopSoldProducts Method', () => {
        expect(dashboard.TopSoldProducts).toBeDefined();
    });

    it('Should have SpecificTopSoldProducts Method', () => {
        expect(dashboard.SpecificTopSoldProducts).toBeDefined();
    });

    it('TopSoldProducts method should return a list of top sold products', async () => {
        const result = await dashboard.TopSoldProducts();
        expect(result).toEqual([]);
    });

    it('SpecificTopSoldProducts method should return a list of top 5 sold products', async () => {
        const result = await dashboard.SpecificTopSoldProducts(5);
        expect(result).toEqual([]);
    });
});