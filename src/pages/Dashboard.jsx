import React, { useState } from 'react';
import { INDIAN_STOCKS, MARKET_INDICES } from '../data/mockData';
import { TrendingUp, TrendingDown, ChevronRight, Activity, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { currentUser, loginWithGoogle } = useAuth();
    const [showAllStocks, setShowAllStocks] = useState(false);
    const displayedStocks = showAllStocks ? INDIAN_STOCKS : INDIAN_STOCKS.slice(0, 4);

    const containerStyle = {
        padding: '0 2rem 4rem 2rem',
        filter: currentUser ? 'none' : 'blur(4px)',
        pointerEvents: currentUser ? 'auto' : 'none',
        transition: 'all 0.5s ease'
    };

    return (
        <div className="animate-fade-in" style={{ position: 'relative', minHeight: '80vh' }}>
            {!currentUser && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(10, 10, 12, 0.4)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px'
                }}>
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto',
                            color: 'var(--accent-primary)'
                        }}>
                            <Lock size={32} />
                        </div>
                        <h2 className="font-outfit" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Unlock Market Intelligence</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Sign in with your Google account to access real-time stock analysis, AI predictions, and sector deep-dives.
                        </p>
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            Sign In to Continue
                        </button>
                    </div>
                </div>
            )}

            <div style={containerStyle}>
                {/* Hero Section */}
                <header style={{ marginBottom: '3rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Market Intelligence
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Actionable insights for the Indian stock market. Powered by AI.
                    </p>
                </header>

                {/* Indices Scroller */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {MARKET_INDICES.map((index) => (
                        <div key={index.name} className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>{index.name}</span>
                                <div style={{
                                    color: index.change >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)',
                                    background: index.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    {index.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {index.changePercentage}%
                                </div>
                            </div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'Outfit' }}>
                                ₹{index.value.toLocaleString('en-IN')}
                            </div>
                            <div style={{ color: index.change >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} Today
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Top Movers */}
                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Top Movers</h2>
                            <button
                                onClick={() => setShowAllStocks(!showAllStocks)}
                                style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {showAllStocks ? 'Show Less' : 'View All'} <ChevronRight size={16} style={{ transform: showAllStocks ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.3s' }} />
                            </button>
                        </div>

                        <div className="glass-card subtle-border" style={{ overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>STOCK</th>
                                        <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>PRICE</th>
                                        <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>CHANGE</th>
                                        <th style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>SENTIMENT</th>
                                        <th style={{ padding: '1rem' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedStocks.map((stock) => (
                                        <tr key={stock.symbol} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} className="table-row-hover">
                                            <td style={{ padding: '1.25rem 1rem' }}>
                                                <Link to={currentUser ? `/stock/${stock.id}` : '#'} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{stock.symbol}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{stock.name}</span>
                                                </Link>
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 500 }}>₹{stock.price.toLocaleString('en-IN')}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ color: stock.change >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)', fontWeight: 600 }}>
                                                    {stock.change >= 0 ? '+' : ''}{stock.changePercentage}%
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    color: stock.sentiment === 'Bullish' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    <Activity size={14} />
                                                    {stock.sentiment}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <Link to={currentUser ? `/stock/${stock.id}` : '#'}>
                                                    <button style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--text-tertiary)' }}>
                                                        <ChevronRight size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Sector Performance */}
                    <section>
                        <h2 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Sector Snapshot</h2>
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            {[
                                { name: 'Energy', perf: 2.4, color: 'var(--accent-primary)' },
                                { name: 'IT Services', perf: -0.3, color: 'var(--accent-danger)' },
                                { name: 'Banking', perf: 0.5, color: 'var(--accent-primary)' },
                                { name: 'Consumer', perf: 1.2, color: 'var(--accent-primary)' }
                            ].map(sector => (
                                <div key={sector.name} style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span>{sector.name}</span>
                                        <span style={{ color: sector.color, fontWeight: 600 }}>{sector.perf >= 0 ? '+' : ''}{sector.perf}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${Math.abs(sector.perf) * 10 + 50}%`,
                                            height: '100%',
                                            background: sector.color,
                                            borderRadius: '3px'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <style>{`
            .table-row-hover:hover {
              background: rgba(255, 255, 255, 0.02);
            }
          `}</style>
            </div>
        </div>
    );
};

export default Dashboard;
