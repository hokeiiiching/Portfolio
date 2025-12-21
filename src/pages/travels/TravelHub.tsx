import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';

interface Trip {
    id: string;
    destination: string;
    location: string;
    date: string;
    coverImage: string;
}

const TRIPS: Trip[] = [
    {
        id: 'hongkong',
        destination: 'Hong Kong',
        location: 'Hong Kong SAR, China',
        date: 'February 2025',
        coverImage: '/travels/hongkong/cover.jpg',
    },
    {
        id: 'sydney',
        destination: 'Sydney',
        location: 'New South Wales, Australia',
        date: 'May 2025',
        coverImage: '/travels/sydney/cover.jpg',
    },
    {
        id: 'chongqing-chengdu',
        destination: 'Chongqing & Chengdu',
        location: 'Sichuan Province, China',
        date: 'December 2025',
        coverImage: '/travels/chongqing-chengdu/cover.jpg',
    },
];

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement!.classList.add('placeholder-image');
        target.parentElement!.innerHTML = '<span>📷 Add cover image</span>';
    };

    return (
        <Link to={`/travels/${trip.id}`} className="trip-card">
            <div className="trip-card-image-container">
                <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="trip-card-image"
                    onError={handleImageError}
                />
            </div>
            <div className="trip-card-content">
                <div className="trip-card-date">{trip.date}</div>
                <h2 className="trip-card-title">{trip.destination}</h2>
                <div className="trip-card-location">
                    <MapPin size={14} />
                    {trip.location}
                </div>
            </div>
        </Link>
    );
};

export const TravelHub: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="travel-hero">
                <div className="secret-badge">
                    <Sparkles size={14} />
                    Secret Section Unlocked!
                </div>
                <h1>My Travel Journal</h1>
                <p>
                    A collection of my adventures around the world.
                    You discovered this hidden section by entering the Konami Code!
                </p>
            </div>

            {/* Trips Grid */}
            <div className="travel-container">
                <div className="trips-grid">
                    {TRIPS.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>
        </>
    );
};
