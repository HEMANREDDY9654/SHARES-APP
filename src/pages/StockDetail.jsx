import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INDIAN_STOCKS, generateHistoricalData } from '../data/mockData';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    ChevronLeft, Info, Shield, AlertCircle, ArrowUpRight, ArrowDownRight,
    Search, Briefcase, Plus, Heart, Share2, TrendingUp, BarChart3
} from 'lucide-react';

const StockDetail = () => {
    const { id } = useParams();
    const stock = INDIAN_STOCKS.find(s => s.id === id) || INDIAN_STOCKS[0];
    const [data] = useState(generateHistoricalData(stock.price, 30));
    const [activeRange, setActiveRange] = useState('1M');
    const [showMA, setShowMA] = useState(false);

    if (!stock) return <div>Stock not found</div>;

    return (
        <div className="animate-fade-in" style={{ padding: '0 2rem 4rem 2rem' }}>
            {/* breadcrumbs & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <ChevronLeft size={16} /> Back to Dashboard
                </Link>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="flex-center" style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Heart size={16} /> Watchlist
                    </button>
                    <button className="flex-center" style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--accent-secondary)', color: 'white', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Plus size={16} /> Add to Portfolio
                    </button>
                </div>
            </div>

            {/* Header Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <h1 className="font-outfit" style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stock.symbol}</h1>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'var(--bg-tertiary)', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {stock.sector} • NSE
                        </span>
                    </div>
                    <h2 style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: 400 }}>{stock.name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Outfit' }}>₹{stock.price.toLocaleString('en-IN')}</div>
                    <div style={{ color: stock.change >= 0 ? 'var(--accent-primary)' : 'var(--accent-danger)', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
                        {stock.change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                        {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercentage}%)
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                {/* Main Chart Section */}
                <div className="glass-card" style={{ padding: '1.5rem', height: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TrendingUp size={18} color="var(--accent-secondary)" /> Price Analysis
                            </h3>
                            <button
                                onClick={() => setShowMA(!showMA)}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    background: showMA ? 'var(--bg-tertiary)' : 'transparent',
                                    color: showMA ? 'var(--accent-secondary)' : 'var(--text-tertiary)',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                MA Indicators
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['1D', '1W', '1M', '1Y', 'ALL'].map(range => (
                                <button
                                    key={range}
                                    onClick={() => setActiveRange(range)}
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: activeRange === range ? 'var(--bg-tertiary)' : 'transparent',
                                        color: activeRange === range ? 'var(--text-primary)' : 'var(--text-tertiary)'
                                    }}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ height: '280px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="date" hide />
                                <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Area type="monotone" dataKey="price" stroke="var(--accent-secondary)" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                                {showMA && <Line type="monotone" dataKey="ma10" stroke="var(--accent-warning)" strokeWidth={1} dot={false} />}
                                {showMA && <Line type="monotone" dataKey="ma20" stroke="var(--accent-danger)" strokeWidth={1} dot={false} />}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    {/* RSI Indicator Mini-chart */}
                    <div style={{ height: '60px', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem', fontWeight: 600 }}>RSI (14) Indicator</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <YAxis domain={[0, 100]} hide />
                                <Tooltip hide />
                                <Line type="monotone" dataKey="rsi" stroke="var(--accent-warning)" strokeWidth={1} dot={false} />
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            AI Smart View
                        </h3>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>PREDICTION</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stock.aiPrediction}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>SENTIMENT</div>
                                <div style={{ fontWeight: 600 }}>{stock.sentiment}</div>
                            </div>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                82%
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Fundamentals</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Mkt Cap</div>
                                <div style={{ fontWeight: 600 }}>₹{stock.marketCap}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>P/E Ratio</div>
                                <div style={{ fontWeight: 600 }}>{stock.peRatio}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>ROE</div>
                                <div style={{ fontWeight: 600 }}>{stock.roe}%</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Div. Yield</div>
                                <div style={{ fontWeight: 600 }}>{stock.dividendYield}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SWOT Analysis */}
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={18} color="var(--accent-primary)" /> Strengths
                    </h3>
                    <ul style={{ listStyle: 'none' }}>
                        {stock.strengths.map((s, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={18} color="var(--accent-danger)" /> Weaknesses
                    </h3>
                    <ul style={{ listStyle: 'none' }}>
                        {stock.weaknesses.map((w, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-danger)' }} />
                                {w}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* News & Community Section */}
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <section>
                    <h3 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Latest News</h3>
                    <div className="glass-card subtle-border" style={{ padding: '1.5rem' }}>
                        {stock.news.length > 0 ? stock.news.map((n) => (
                            <div key={n.id} style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{n.date} • Financial Express</div>
                                <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>{n.title}</h4>
                                <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)' }}>Read Full Article →</Link>
                            </div>
                        )) : (
                            <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '2rem' }}>No recent news for this stock.</div>
                        )}
                    </div>
                </section>

                <section>
                    <h3 className="font-outfit" style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Community Sentiment</h3>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>What's your outlook?</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <button style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)' }}>Bullish</button>
                                <button style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-danger)', fontWeight: 600, border: '1px solid rgba(244, 63, 94, 0.2)' }}>Bearish</button>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>PUBLIC OPINION (742 votes)</div>
                            <div style={{ height: '32px', background: 'var(--bg-tertiary)', borderRadius: '16px', overflow: 'hidden', display: 'flex' }}>
                                <div style={{ width: '75%', background: 'var(--accent-primary)', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>75% BULLISH</div>
                                <div style={{ width: '25%', background: 'var(--accent-danger)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>25%</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StockDetail;

