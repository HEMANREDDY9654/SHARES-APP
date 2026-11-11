import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import PortfolioSim from './pages/PortfolioSim';
import Navbar from './components/Navbar';
import Education from './pages/Education';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stock/:id" element={<StockDetail />} />
              <Route path="/portfolio" element={<PortfolioSim />} />
              <Route path="/education" element={<Education />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
