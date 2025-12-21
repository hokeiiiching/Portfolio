import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import './travels.css';

export const TravelLayout: React.FC = () => {
    const location = useLocation();
    const isHub = location.pathname === '/travels';

    return (
        <div className="travel-page">
            {/* Navigation */}
            <nav className="travel-nav">
                <div className="travel-nav-content">
                    <Link to="/travels" className="travel-nav-title">
                        My Travels
                    </Link>
                    <Link to="/" className="travel-nav-back">
                        <Home size={16} />
                        Back to Portfolio
                    </Link>
                </div>
            </nav>

            {/* Show breadcrumb on trip detail pages */}
            {!isHub && (
                <div className="travel-container" style={{ paddingBottom: 0 }}>
                    <Link
                        to="/travels"
                        className="travel-nav-back"
                        style={{ display: 'inline-flex', marginBottom: '1rem' }}
                    >
                        <ArrowLeft size={16} />
                        All Trips
                    </Link>
                </div>
            )}

            {/* Page Content */}
            <Outlet />

            {/* Footer */}
            <footer className="travel-footer">
                <p>✈️ Secret travel journal discovered via Konami Code</p>
            </footer>
        </div>
    );
};
