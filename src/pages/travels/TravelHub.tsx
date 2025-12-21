import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface Trip {
    id: string;
    destination: string;
    location: string;
    date: string;
    coverImage: string;
    excerpt: string;
}

const TRIPS: Trip[] = [
    {
        id: 'hongkong',
        destination: 'Hong Kong',
        location: 'Hong Kong SAR, China',
        date: 'February 2025',
        coverImage: '/travels/hongkong/cover.jpg',
        excerpt: 'Dim sum, roast meats, and the iconic streets of Tsim Sha Tsui—a culinary journey through Asia\'s world city.',
    },
    {
        id: 'sydney',
        destination: 'Sydney',
        location: 'New South Wales, Australia',
        date: 'May 2025',
        coverImage: '/travels/sydney/cover.jpg',
        excerpt: 'Heritage architecture, Italian comfort food, and legendary seafood—exploring Sydney\'s vibrant autumn charm.',
    },
    {
        id: 'chongqing-chengdu',
        destination: 'Chongqing & Chengdu',
        location: 'Sichuan Province, China',
        date: 'December 2025',
        coverImage: '/travels/chongqing-chengdu/cover.jpg',
        excerpt: 'A journey through China\'s spicy heartland and panda country.',
    },
];

// Featured card (large, overlapping hero)
const FeaturedCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
            parent.classList.add('placeholder-image');
            parent.innerHTML = '<span>Add cover image</span>';
        }
    };

    return (
        <Link to={`/travels/${trip.id}`} className="featured-card">
            <img
                src={trip.coverImage}
                alt={trip.destination}
                className="featured-card-image"
                onError={handleImageError}
            />
            <div className="featured-card-content">
                <div className="featured-card-category">Travel</div>
                <h2 className="featured-card-title">{trip.destination}</h2>
            </div>
        </Link>
    );
};

// Secondary card (smaller, beside featured)
const SecondaryCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
            parent.classList.add('placeholder-image');
            parent.innerHTML = '<span>Add cover image</span>';
        }
    };

    return (
        <Link to={`/travels/${trip.id}`} className="secondary-card">
            <div className="secondary-card-image-container">
                <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="secondary-card-image"
                    onError={handleImageError}
                />
            </div>
            <div className="secondary-card-content">
                <div className="secondary-card-category">Travel</div>
                <h3 className="secondary-card-title">{trip.destination}</h3>
                <span className="read-link">
                    <Menu size={14} />
                    Read
                </span>
            </div>
        </Link>
    );
};

// Standard trip card for grid
const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
            parent.classList.add('placeholder-image');
            parent.innerHTML = '<span>Add cover image</span>';
        }
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
                <div className="trip-card-category">Travel</div>
                <h3 className="trip-card-title">{trip.destination}</h3>
                <div className="trip-card-date">{trip.date}</div>
                <span className="read-link">
                    <Menu size={14} />
                    Read
                </span>
            </div>
        </Link>
    );
};

export const TravelHub: React.FC = () => {
    // First trip is featured, second is secondary, rest go in grid
    const [featured, secondary, ...remaining] = TRIPS;

    return (
        <>
            {/* Hero Section with dramatic background */}
            <div
                className="travel-hero"
                style={{
                    backgroundImage: `url(${featured.coverImage})`,
                    backgroundColor: '#1a1a1a'
                }}
            >
                <div className="travel-hero-content">
                    <div className="travel-hero-title">
                        <h1>Travel</h1>
                    </div>
                    <p>
                        Personal journeys and adventures from around the world.
                        Exploring cultures, landscapes, and the stories that connect us.
                    </p>
                </div>
            </div>

            {/* Featured Section - Overlapping hero */}
            <div className="featured-section">
                <FeaturedCard trip={featured} />
                {secondary && <SecondaryCard trip={secondary} />}
            </div>

            {/* All Trips Grid */}
            <div className="travel-container">
                <div className="section-header">
                    <h2>All Journeys</h2>
                </div>
                <div className="trips-grid">
                    {TRIPS.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>
        </>
    );
};
