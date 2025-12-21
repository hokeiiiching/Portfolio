import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

interface TripData {
    id: string;
    destination: string;
    location: string;
    date: string;
    coverImage: string;
    gallery: string[];
    description: string[];
}

const TRIPS_DATA: Record<string, TripData> = {
    'hongkong': {
        id: 'hongkong',
        destination: 'Hong Kong',
        location: 'Hong Kong SAR, China',
        date: 'February 2025',
        coverImage: '/travels/hongkong/cover.jpg',
        gallery: [
            '/travels/hongkong/gallery-1.jpg',
            '/travels/hongkong/gallery-2.jpg',
            '/travels/hongkong/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            'Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        ],
    },
    'sydney': {
        id: 'sydney',
        destination: 'Sydney',
        location: 'New South Wales, Australia',
        date: 'May 2025',
        coverImage: '/travels/sydney/cover.jpg',
        gallery: [
            '/travels/sydney/gallery-1.jpg',
            '/travels/sydney/gallery-2.jpg',
            '/travels/sydney/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            'Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        ],
    },
    'chongqing-chengdu': {
        id: 'chongqing-chengdu',
        destination: 'Chongqing & Chengdu',
        location: 'Sichuan Province, China',
        date: 'December 2025',
        coverImage: '/travels/chongqing-chengdu/cover.jpg',
        gallery: [
            '/travels/chongqing-chengdu/gallery-1.jpg',
            '/travels/chongqing-chengdu/gallery-2.jpg',
            '/travels/chongqing-chengdu/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
            'Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        ],
    },
};

export const TripPage: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const trip = tripId ? TRIPS_DATA[tripId] : null;

    if (!trip) {
        return <Navigate to="/travels" replace />;
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.classList.add('placeholder-image');
        target.style.background = 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)';
    };

    return (
        <>
            {/* Hero with Cover Image */}
            <div
                className="trip-hero"
                style={{
                    backgroundImage: `url(${trip.coverImage})`,
                    backgroundColor: '#374151'
                }}
            >
                <div className="trip-hero-content">
                    <div className="trip-hero-date">
                        <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        {trip.date}
                    </div>
                    <h1 className="trip-hero-title">{trip.destination}</h1>
                    <div className="trip-hero-location">
                        <MapPin size={18} />
                        {trip.location}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="trip-content">
                {/* Story Section */}
                <section className="trip-section">
                    <h2 className="trip-section-title">The Story</h2>
                    <div className="trip-text">
                        {trip.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                {/* Photo Gallery Section */}
                <section className="trip-section">
                    <h2 className="trip-section-title">Photo Gallery</h2>
                    <div className="photo-gallery">
                        {trip.gallery.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${trip.destination} - Photo ${index + 1}`}
                                className="gallery-image"
                                onError={handleImageError}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};
