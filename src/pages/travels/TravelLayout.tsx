import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './travels.css';

export const TravelLayout: React.FC = () => {
    const location = useLocation();
    const isHub = location.pathname === '/travels';

    return (
        <div className="travel-page">
            {/* Minimal Navigation */}
            <nav className="travel-nav">
                <div className="travel-nav-content">
                    <Link to="/travels" className="travel-nav-title">
                        Travel
                    </Link>
                    <Link to="/" className="travel-nav-back">
                        <ArrowLeft size={14} />
                        Portfolio
                    </Link>
                </div>
            </nav>

            {/* Breadcrumb on detail pages */}
            {!isHub && (
                <div className="travel-container" style={{ paddingBottom: 0, paddingTop: '1rem' }}>
                    <Link
                        to="/travels"
                        className="travel-nav-back"
                        style={{ display: 'inline-flex' }}
                    >
                        <ArrowLeft size={14} />
                        All Journeys
                    </Link>
                </div>
            )}

            {/* Page Content */}
            <Outlet />

            {/* Minimal Footer */}
            <footer className="travel-footer">
                <p>© {new Date().getFullYear()} · Personal Travel Journal</p>
            </footer>
        </div>
    );
};
