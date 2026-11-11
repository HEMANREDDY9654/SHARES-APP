export const INDIAN_STOCKS = [
    {
        id: "RELIANCE",
        symbol: "RELIANCE",
        name: "Reliance Industries Limited",
        sector: "Energy",
        price: 2985.45,
        change: +45.20,
        changePercentage: +1.54,
        marketCap: "18.5T",
        peRatio: 28.4,
        eps: 105.12,
        dividendYield: 0.3,
        roe: 12.5,
        capSize: "Large",
        health: "Excellent",
        strengths: ["Strong Cash Flow", "Multi-sector Dominance", "Deleveraged Balance Sheet"],
        weaknesses: ["Regulatory Risks", "Cyclical Energy Prices"],
        sentiment: "Bullish",
        aiPrediction: "Strong Buy (Long-term)",
        news: [
            { id: 1, title: "Reliance to expand green energy portfolio", date: "2026-02-24" },
            { id: 2, title: "Quarterly profits beat analyst estimates", date: "2026-02-20" }
        ]
    },
    {
        id: "TCS",
        symbol: "TCS",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        price: 4120.10,
        change: -12.45,
        changePercentage: -0.30,
        marketCap: "15.1T",
        peRatio: 31.2,
        eps: 132.05,
        dividendYield: 1.2,
        roe: 39.1,
        capSize: "Large",
        health: "Excellent",
        strengths: ["global Brand", "High ROE", "Zero Debt"],
        weaknesses: ["Slowdown in US spending", "High attrition risk"],
        sentiment: "Neutral",
        aiPrediction: "Hold (Mid-term)",
        news: [
            { id: 3, title: "TCS wins $500M contract with UK retailer", date: "2026-02-23" }
        ]
    },
    {
        id: "HDFCBANK",
        symbol: "HDFC BANK",
        name: "HDFC Bank Limited",
        sector: "Banking",
        price: 1445.60,
        change: +5.15,
        changePercentage: +0.36,
        marketCap: "10.9T",
        peRatio: 18.5,
        eps: 78.10,
        dividendYield: 1.1,
        roe: 17.2,
        capSize: "Large",
        health: "Good",
        strengths: ["Stable NIMs", "Retail Loan Growth"],
        weaknesses: ["Merger integration overheads"],
        sentiment: "Bullish",
        aiPrediction: "Buy (Long-term)",
        news: []
    },
    {
        id: "ZOMATO",
        symbol: "ZOMATO",
        name: "Zomato Limited",
        sector: "Consumer Services",
        price: 165.20,
        change: +8.45,
        changePercentage: +5.40,
        marketCap: "1.4T",
        peRatio: 120.5,
        eps: 1.37,
        dividendYield: 0,
        roe: 2.1,
        capSize: "Mid",
        health: "Fair",
        strengths: ["Market Leadership", "Blinkit Growth"],
        weaknesses: ["Intense Competition", "High Valuation"],
        sentiment: "Bullish",
        aiPrediction: "Buy (Short-term)",
        news: []
    },
    {
        id: "HCLTECH",
        symbol: "HCLTECH",
        name: "HCL Technologies Limited",
        sector: "IT Services",
        price: 1650.00,
        change: +15.50,
        changePercentage: +0.95,
        marketCap: "4.5T",
        peRatio: 24.1,
        eps: 68.20,
        dividendYield: 2.5,
        roe: 22.8,
        capSize: "Large",
        health: "Excellent",
        strengths: ["Strong Digital Services", "Stable Dividend"],
        weaknesses: ["Global IT slowdown"],
        sentiment: "Bullish",
        aiPrediction: "Buy (Mid-term)",
        news: []
    },
    {
        id: "INFY",
        symbol: "INFY",
        name: "Infosys Limited",
        sector: "IT Services",
        price: 1680.45,
        change: -35.20,
        changePercentage: -2.05,
        marketCap: "6.9T",
        peRatio: 25.4,
        eps: 66.12,
        dividendYield: 1.8,
        roe: 31.5,
        capSize: "Large",
        health: "Excellent",
        strengths: ["Cloud Transformation", "Deep Client Relationships"],
        weaknesses: ["Margin pressures"],
        sentiment: "Bearish",
        aiPrediction: "Hold (Short-term)",
        news: []
    },
    {
        id: "ICICIBANK",
        symbol: "ICICI BANK",
        name: "ICICI Bank Limited",
        sector: "Banking",
        price: 1085.30,
        change: +12.10,
        changePercentage: +1.12,
        marketCap: "7.6T",
        peRatio: 17.8,
        eps: 61.20,
        dividendYield: 0.8,
        roe: 18.2,
        capSize: "Large",
        health: "Good",
        strengths: ["Strong Digital Presence", "High Asset Quality"],
        weaknesses: ["Exposure to corporate book"],
        sentiment: "Bullish",
        aiPrediction: "Buy (Mid-term)",
        news: []
    },
    {
        id: "SBIN",
        symbol: "SBI",
        name: "State Bank of India",
        sector: "Banking",
        price: 755.40,
        change: +8.90,
        changePercentage: +1.19,
        marketCap: "6.7T",
        peRatio: 10.2,
        eps: 74.50,
        dividendYield: 1.5,
        roe: 16.5,
        capSize: "Large",
        health: "Good",
        strengths: ["Massive Retail Base", "Improving NIMs"],
        weaknesses: ["PSU inefficiencies"],
        sentiment: "Bullish",
        aiPrediction: "Buy (Long-term)",
        news: []
    }
];

export const MARKET_INDICES = [
    { name: "NIFTY 50", value: 22150.45, change: +110.20, changePercentage: +0.50 },
    { name: "SENSEX", value: 73050.12, change: +350.45, changePercentage: +0.48 },
    { name: "NIFTY BANK", value: 46800.75, change: -45.10, changePercentage: -0.10 }
];

export const generateHistoricalData = (basePrice, points = 30) => {
    let prevPrice = basePrice;
    const data = Array.from({ length: points }).map((_, i) => {
        const change = (Math.random() - 0.5) * (basePrice * 0.05);
        const price = Math.max(1, prevPrice + change);
        prevPrice = price;
        return {
            date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            price: parseFloat(price.toFixed(2)),
            volume: Math.floor(Math.random() * 1000000) + 500000
        };
    });

    // Simple MA Calculation
    data.forEach((d, i) => {
        if (i >= 9) {
            const slice = data.slice(i - 9, i + 1);
            d.ma10 = parseFloat((slice.reduce((acc, curr) => acc + curr.price, 0) / 10).toFixed(2));
        }
        if (i >= 19) {
            const slice = data.slice(i - 19, i + 1);
            d.ma20 = parseFloat((slice.reduce((acc, curr) => acc + curr.price, 0) / 20).toFixed(2));
        }

        // Fake RSI for visualization
        d.rsi = 40 + Math.random() * 30;
    });

    return data;
};

