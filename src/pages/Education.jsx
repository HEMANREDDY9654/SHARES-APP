import React, { useState } from 'react';
import { BookOpen, HelpCircle, Lightbulb, ChevronRight, ArrowLeft, TrendingUp, Briefcase } from 'lucide-react';

const Education = () => {
    const [activePath, setActivePath] = useState(null);
    const [expandedStep, setExpandedStep] = useState(null);

    const learningPaths = {
        'Basics of Stock Market': {
            icon: <BookOpen size={24} />,
            content: "The stock market is where shares of publicly held companies are issued and traded. It's a key component of a free-market economy, allowing companies to raise capital by selling shares to the public.",
            steps: [
                {
                    title: "What is a Share?",
                    content: "A share represents a unit of ownership in a company. When you buy a share, you are essentially buying a small piece of that business, entitling you to a portion of its assets and profits."
                },
                {
                    title: "How Stock Exchanges Work (NSE/BSE)",
                    content: "Exchanges like NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) act as a marketplace where buyers and sellers meet to trade shares. They ensure transparency, liquidity, and fair pricing."
                },
                {
                    title: "Understanding Market Cap",
                    content: "Market Capitalization is the total value of a company's shares. It is calculated by multiplying the current share price by the total number of outstanding shares. It helps categorize companies into Large, Mid, and Small Cap."
                },
                {
                    title: "The Power of Compounding",
                    content: "Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes."
                }
            ]
        },
        'Fundamental Analysis 101': {
            icon: <HelpCircle size={24} />,
            content: "Fundamental analysis is a method of determining a stock's 'fair market' value by studying the company's financial health and economic conditions.",
            steps: [
                {
                    title: "Reading Balance Sheets",
                    content: "A balance sheet provides a snapshot of a company's financial position at a specific point in time, showing its assets (what it owns), liabilities (what it owes), and equity (shareholders' stake)."
                },
                {
                    title: "Analyzing P&L Statements",
                    content: "The Profit and Loss (P&L) statement summarizes the revenues, costs, and expenses incurred during a specific period. It reveals the company's ability to generate profit."
                },
                {
                    title: "Key Ratios: PE, PB, ROE",
                    content: "PE (Price-to-Earnings) measures valuation. PB (Price-to-Book) compares market value to book value. ROE (Return on Equity) measures how effectively management uses investors' money to generate profit."
                },
                {
                    title: "Evaluating Management Quality",
                    content: "Long-term success depends on the leadership. Investors look for transparency, a track record of capital allocation, and a clear vision for future growth."
                }
            ]
        },
        'Technical Indicators Pro': {
            icon: <TrendingUp size={24} />,
            content: "Technical analysis uses historical price patterns and volume data to predict future market trends. It's about 'reading the chart'.",
            steps: [
                {
                    title: "Support and Resistance",
                    content: "Support is a price level where a downtrend tends to pause due to a concentration of demand. Resistance is where an uptrend pauses due to a concentration of supply."
                },
                {
                    title: "Moving Averages (SMA/EMA)",
                    content: "Moving averages smooth out price data to identify the trend direction. SMA (Simple) gives equal weight to all prices, while EMA (Exponential) reacts faster to recent price changes."
                },
                {
                    title: "Relative Strength Index (RSI)",
                    content: "RSI is a momentum oscillator that ranges from 0 to 100. Traditionally, a reading above 70 indicates an overbought condition, while below 30 indicates an oversold condition."
                },
                {
                    title: "MACD & Bollinger Bands",
                    content: "MACD shows the relationship between two moving averages of a stock’s price. Bollinger Bands consist of a middle SMA and two outer standard deviation lines, helping identify volatility."
                }
            ]
        },
        'Portfolio Management': {
            icon: <Briefcase size={24} />,
            content: "Effective portfolio management involves balancing risk and reward through strategic asset allocation and regular monitoring.",
            steps: [
                {
                    title: "Asset Allocation Strategy",
                    content: "This involves dividing an investment portfolio among different asset categories, such as stocks, bonds, and cash, depending on the individual’s risk tolerance and time horizon."
                },
                {
                    title: "Diversification vs Concentration",
                    content: "Diversification spreads risk across various assets to minimize the impact of any single asset's performance. Concentration focuses on a few high-conviction bets for higher potential returns."
                },
                {
                    title: "Risk Assessment Tools",
                    content: "Tools like Beta measure a stock's volatility relative to the market. Standard deviation and Value at Risk (VaR) help quantify potential losses in a portfolio."
                },
                {
                    title: "Regular Portfolio Rebalancing",
                    content: "Rebalancing is the process of realigning the weightings of a portfolio's assets by buying or selling assets to maintain the original desired level of asset allocation."
                }
            ]
        }
    };

    const glossary = [
        { term: 'PE Ratio', definition: 'Price-to-Earnings ratio. It relates a company’s share price to its earnings per share.' },
        { term: 'EPS', definition: 'Earnings Per Share. The portion of a company’s profit allocated to each outstanding share of common stock.' },
        { term: 'Dividend Yield', definition: 'A financial ratio that shows how much a company pays out in dividends each year relative to its stock price.' },
        { term: 'Market Cap', definition: 'The total market value of a company’s outstanding shares of stock.' },
        { term: 'RSI', definition: 'Relative Strength Index. A momentum indicator that measures the magnitude of recent price changes to evaluate overbought or oversold conditions.' },
        { term: 'NIFTY 50', definition: 'The flagship index on the National Stock Exchange of India (NSE), tracking the 50 largest and most liquid Indian stocks.' }
    ];

    if (activePath) {
        const path = learningPaths[activePath];
        return (
            <div className="animate-fade-in" style={{ padding: '0 2rem 4rem 2rem' }}>
                <button
                    onClick={() => { setActivePath(null); setExpandedStep(null); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}
                >
                    <ArrowLeft size={16} /> Back to Hub
                </button>

                <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>
                        {path.icon}
                        <h1 className="font-outfit" style={{ fontSize: '2rem', fontWeight: 700 }}>{activePath}</h1>
                    </div>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                        {path.content}
                    </p>

                    <h3 className="font-outfit" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Mastery Steps</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {path.steps.map((step, i) => (
                            <div
                                key={i}
                                onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '1.25rem',
                                    background: expandedStep === i ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    border: `1px solid ${expandedStep === i ? 'var(--accent-secondary)' : 'var(--border-color)'}`,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: expandedStep === i ? 'var(--accent-secondary)' : 'var(--bg-tertiary)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {i + 1}
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: '1rem', flex: 1 }}>{step.title}</span>
                                    <ChevronRight
                                        size={18}
                                        style={{
                                            transform: expandedStep === i ? 'rotate(90deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                            color: 'var(--text-tertiary)'
                                        }}
                                    />
                                </div>
                                {expandedStep === i && (
                                    <div style={{
                                        marginTop: '1.25rem',
                                        paddingTop: '1.25rem',
                                        borderTop: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.6,
                                        fontSize: '0.95rem'
                                    }}>
                                        {step.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        style={{
                            marginTop: '3.5rem',
                            width: '100%',
                            padding: '1.25rem',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)'
                        }}
                        onClick={() => alert("Keep learning! You're doing great.")}
                    >
                        Mark Path as Complete
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ padding: '0 2rem 4rem 2rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Stock Knowledge Hub
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Master the art of investing with our curated guides and glossary.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                <aside>
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                        <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BookOpen size={18} color="var(--accent-secondary)" /> Learning Paths
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {Object.keys(learningPaths).map(path => (
                                <button
                                    key={path}
                                    onClick={() => setActivePath(path)}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '10px', background: 'var(--bg-secondary)', fontSize: '0.9rem', textAlign: 'left' }}
                                >
                                    {path} <ChevronRight size={16} color="var(--text-tertiary)" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lightbulb size={18} /> Pro Tip
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Never invest more than you can afford to lose. Start with blue-chip stocks (large-cap) before moving to volatile small-caps.
                        </p>
                    </div>
                </aside>

                <section>
                    <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Market Glossary</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {glossary.map((item) => (
                            <div key={item.term} className="glass-card subtle-border" style={{ padding: '1.5rem' }}>
                                <h4 style={{ color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>{item.term}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.definition}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Education;
