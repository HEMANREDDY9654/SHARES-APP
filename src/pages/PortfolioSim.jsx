import React, { useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, PieChart, Info, Plus } from 'lucide-react';
import { INDIAN_STOCKS } from '../data/mockData';

const PortfolioSim = () => {
    const [balance, setBalance] = useState(1000000); // 10 Lakhs Virtual Cash
    const [holdings, setHoldings] = useState([
        { symbol: 'RELIANCE', shares: 10, avgPrice: 2850, currentPrice: 2985.45 },
        { symbol: 'ZOMATO', shares: 500, avgPrice: 140, currentPrice: 165.20 },
    ]);

    const handleTrade = (type) => {
        const symbol = prompt("Enter stock symbol (RELIANCE, TCS, ZOMATO, HDFCBANK):").toUpperCase();
        const stock = INDIAN_STOCKS.find(s => s.symbol === symbol) || INDIAN_STOCKS[0];
        const qty = parseInt(prompt(`Enter quantity to ${type}:`));

        if (isNaN(qty) || qty <= 0) return;

        const totalCost = stock.price * qty;

        if (type === 'BUY') {
            if (totalCost > balance) {
                alert("Insufficient Virtual Cash!");
                return;
            }
            setBalance(prev => prev - totalCost);
            setHoldings(prev => {
                const existing = prev.find(h => h.symbol === symbol);
                if (existing) {
                    const newShares = existing.shares + qty;
                    const newAvg = (existing.shares * existing.avgPrice + totalCost) / newShares;
                    return prev.map(h => h.symbol === symbol ? { ...h, shares: newShares, avgPrice: newAvg } : h);
                }
                return [...prev, { symbol, shares: qty, avgPrice: stock.price, currentPrice: stock.price }];
            });
        } else {
            const existing = holdings.find(h => h.symbol === symbol);
            if (!existing || existing.shares < qty) {
                alert("Not enough shares to sell!");
                return;
            }
            setBalance(prev => prev + totalCost);
            setHoldings(prev => {
                const newShares = existing.shares - qty;
                if (newShares === 0) return prev.filter(h => h.symbol !== symbol);
                return prev.map(h => h.symbol === symbol ? { ...h, shares: newShares } : h);
            });
        }
    };

    const totalInvestment = holdings.reduce((acc, h) => acc + (h.shares * h.avgPrice), 0);
    const currentValue = holdings.reduce((acc, h) => acc + (h.shares * h.currentPrice), 0);
    const totalPnL = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

    return (
        <div className="animate-fade-in" style={{ padding: '0 2rem 4rem 2rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Virtual Portfolio
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Simulate investments and track performance without real capital.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => handleTrade('BUY')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--accent-primary)', color: 'white', fontWeight: 700 }}>Buy Stock</button>
                    <button onClick={() => handleTrade('SELL')} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)', fontWeight: 700 }}>Sell Stock</button>
                </div>
            </header>


            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <Briefcase size={18} /> Portfolio Value
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹{currentValue.toLocaleString('en-IN')}</div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 600 }}>
                        +{pnlPercentage.toFixed(2)}% Overall
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <DollarSign size={18} /> Available Cash
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>₹{balance.toLocaleString('en-IN')}</div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        Starting Balance: ₹10,00,000
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <TrendingUp size={18} /> Total P&L
                    </div>
                    <div style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: totalPnL >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)'
                    }}>
                        {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN')}
                    </div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        Realized + Unrealized
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '2rem' }}>
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Current Holdings</h2>
                        <button className="flex-center" style={{
                            background: 'var(--bg-tertiary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            gap: '0.5rem'
                        }}>
                            <Plus size={16} /> New Trade
                        </button>
                    </div>

                    <div className="glass-card subtle-border" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>ASSET</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>UNITS</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>AVG COST</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>P&L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((h) => {
                                    const pnl = (h.currentPrice - h.avgPrice) * h.shares;
                                    const pnlPct = ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100;
                                    return (
                                        <tr key={h.symbol} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1.25rem 1rem' }}>
                                                <span style={{ fontWeight: 600 }}>{h.symbol}</span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>{h.shares}</td>
                                            <td style={{ padding: '1rem' }}>₹{h.avgPrice}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ color: pnl >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)', fontWeight: 600 }}>
                                                    {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: pnl >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)', opacity: 0.8 }}>
                                                    {pnlPct.toFixed(2)}%
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Allocation</h2>
                    <div className="glass-card flex-center" style={{ padding: '2rem', minHeight: '300px', flexDirection: 'column', gap: '1rem' }}>
                        <PieChart size={64} color="var(--text-tertiary)" />
                        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textAlign: 'center' }}>
                            Visual allocation chart using Recharts will be rendered here.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PortfolioSim;
