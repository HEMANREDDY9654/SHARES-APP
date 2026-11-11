import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Search, Bell, Menu, BookOpen, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { currentUser, loginWithGoogle, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Portfolio', path: '/portfolio', icon: <Briefcase size={20} /> },
        { name: 'Education', path: '/education', icon: <BookOpen size={20} /> },
    ];

    return (
        <nav className="glass-card subtle-border" style={{
            margin: '1rem',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '1rem',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>S</div>
                    <span className="font-outfit" style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
                        SHARES<span style={{ color: 'var(--accent-primary)' }}>.IN</span>
                    </span>
                </Link>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                                background: location.pathname === item.path ? 'var(--bg-tertiary)' : 'transparent',
                            }}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '24px',
                    width: '240px',
                    border: '1px solid var(--border-color)'
                }}>
                    <Search size={16} color="var(--text-tertiary)" />
                    <input
                        type="text"
                        placeholder="Search stocks (Reliance, TCS...)"
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.85rem',
                            width: '100%',
                            outline: 'none'
                        }}
                    />
                </div>

                {currentUser ? (
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.25rem',
                                paddingRight: '0.75rem',
                                borderRadius: '20px',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <img
                                src={currentUser.photoURL}
                                alt="avatar"
                                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                            />
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {currentUser.displayName?.split(' ')[0]}
                            </span>
                        </button>

                        {showProfileMenu && (
                            <div className="glass-card animate-scale-up" style={{
                                position: 'absolute',
                                top: '120%',
                                right: 0,
                                width: '200px',
                                padding: '0.5rem',
                                zIndex: 1000
                            }}>
                                <button
                                    onClick={() => logout()}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--accent-danger)',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        borderRadius: '8px'
                                    }}
                                    className="menu-item-hover"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={async () => {
                            try {
                                await loginWithGoogle();
                            } catch (err) {
                                alert(`Login Error: ${err.code || err.message}\nTip: Ensure Google Login is enabled in Firebase Authentication Console.`);
                            }
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.6rem 1.25rem',
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        <LogIn size={18} /> Login
                    </button>
                )}
            </div>

            <style>{`
                .animate-scale-up {
                    animation: scaleUp 0.15s ease-out forwards;
                }
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .menu-item-hover:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </nav >
    );
};

export default Navbar;
