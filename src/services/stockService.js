import { INDIAN_STOCKS, MARKET_INDICES, generateHistoricalData } from '../data/mockData';

/**
 * Service to handle all stock-related data fetching.
 * Currently uses mock data, but structured for easy transition to real APIs.
 */
export const stockService = {
    /**
     * Get all available stocks
     */
    getAllStocks: () => {
        return INDIAN_STOCKS;
    },

    /**
     * Get a specific stock by its ID/Symbol
     */
    getStockById: (id) => {
        return INDIAN_STOCKS.find(s => s.id === id) || null;
    },

    /**
     * Get market indices (NIFTY 50, SENSEX, etc.)
     */
    getMarketIndices: () => {
        return MARKET_INDICES;
    },

    /**
     * Get historical price data for a specific stock
     */
    getHistoricalData: (basePrice, points = 30) => {
        return generateHistoricalData(basePrice, points);
    },

    /**
     * Get top moving stocks
     */
    getTopMovers: (limit = 5) => {
        return [...INDIAN_STOCKS]
            .sort((a, b) => Math.abs(b.changePercentage) - Math.abs(a.changePercentage))
            .slice(0, limit);
    }
};
