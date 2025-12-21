import React, { useState } from 'react';
import { MapPin, Calendar, ChevronLeft, ChevronRight, X, Plane, Camera } from 'lucide-react';

interface Trip {
    id: string;
    destination: string;
    location: string;
    date: string;
    color: string;
    coverImage: string;
    gallery: string[];
    description: string[];
}

const TRIPS: Trip[] = [
    {
        id: 'hongkong',
        destination: 'Hong Kong',
        location: 'Hong Kong SAR, China',
        date: 'February 2025',
        color: 'cyan',
        coverImage: '/travels/hongkong/cover.jpg',
        gallery: [
            '/travels/hongkong/gallery-1.jpg',
            '/travels/hongkong/gallery-2.jpg',
            '/travels/hongkong/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ],
    },
    {
        id: 'sydney',
        destination: 'Sydney',
        location: 'New South Wales, Australia',
        date: 'May 2025',
        color: 'magenta',
        coverImage: '/travels/sydney/cover.jpg',
        gallery: [
            '/travels/sydney/gallery-1.jpg',
            '/travels/sydney/gallery-2.jpg',
            '/travels/sydney/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ],
    },
    {
        id: 'chongqing-chengdu',
        destination: 'Chongqing & Chengdu',
        location: 'Sichuan Province, China',
        date: 'December 2025',
        color: 'green',
        coverImage: '/travels/chongqing-chengdu/cover.jpg',
        gallery: [
            '/travels/chongqing-chengdu/gallery-1.jpg',
            '/travels/chongqing-chengdu/gallery-2.jpg',
            '/travels/chongqing-chengdu/gallery-3.jpg',
        ],
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ],
    },
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; text: string; bg: string; glow: string }> = {
        cyan: {
            border: 'border-neon-cyan/30',
            text: 'text-neon-cyan',
            bg: 'bg-neon-cyan/10',
            glow: 'hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]',
        },
        magenta: {
            border: 'border-neon-magenta/30',
            text: 'text-neon-magenta',
            bg: 'bg-neon-magenta/10',
            glow: 'hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]',
        },
        green: {
            border: 'border-neon-green/30',
            text: 'text-neon-green',
            bg: 'bg-neon-green/10',
            glow: 'hover:shadow-[0_0_20px_rgba(0,255,159,0.3)]',
        },
    };
    return colors[color] || colors.cyan;
};

// Trip Card Component
const TripCard: React.FC<{ trip: Trip; onClick: () => void }> = ({ trip, onClick }) => {
    const colorClasses = getColorClasses(trip.color);

    return (
        <div
            onClick={onClick}
            className={`
                relative overflow-hidden rounded-lg border ${colorClasses.border}
                bg-cyber-surface cursor-pointer transition-all duration-300
                hover:border-opacity-60 ${colorClasses.glow} group
            `}
        >
            {/* Cover Image */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={trip.coverImage}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%230a0a0f" width="400" height="200"/><text x="200" y="100" text-anchor="middle" fill="%2300f5ff" font-family="monospace" font-size="14">[ Add Image ]</text></svg>';
                    }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />

                {/* Date badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border} backdrop-blur-sm`}>
                    <Calendar size={10} className="inline mr-1" />
                    {trip.date}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className={`text-lg font-bold ${colorClasses.text} mb-1 font-cyber`}>
                    {trip.destination}
                </h3>
                <p className="text-sm text-neon-cyan/50 flex items-center gap-1">
                    <MapPin size={12} />
                    {trip.location}
                </p>
            </div>

            {/* Hover indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
        </div>
    );
};

// Expanded Trip Detail View
const TripDetail: React.FC<{ trip: Trip; onClose: () => void }> = ({ trip, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const colorClasses = getColorClasses(trip.color);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % trip.gallery.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + trip.gallery.length) % trip.gallery.length);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${colorClasses.border}`}>
                <div>
                    <h2 className={`text-xl font-bold ${colorClasses.text} font-cyber flex items-center gap-2`}>
                        <Plane size={20} />
                        {trip.destination}
                    </h2>
                    <p className="text-sm text-neon-cyan/50 flex items-center gap-2 mt-1">
                        <MapPin size={12} />
                        {trip.location}
                        <span className="mx-2">•</span>
                        <Calendar size={12} />
                        {trip.date}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded border border-neon-cyan/30 text-neon-cyan/70 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 space-y-6">
                {/* Image Gallery */}
                <div className={`relative rounded-lg overflow-hidden border ${colorClasses.border}`}>
                    <div className="relative h-64">
                        <img
                            src={trip.gallery[currentImageIndex]}
                            alt={`${trip.destination} - Photo ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260"><rect fill="%230a0a0f" width="400" height="260"/><text x="200" y="130" text-anchor="middle" fill="%2300f5ff" font-family="monospace" font-size="14">[ Add Image ]</text></svg>';
                            }}
                        />

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyber-bg/80 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan/60 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyber-bg/80 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan/60 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyber-bg/80 text-neon-cyan text-xs border border-neon-cyan/30 flex items-center gap-2">
                            <Camera size={12} />
                            {currentImageIndex + 1} / {trip.gallery.length}
                        </div>
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex gap-2 p-3 bg-cyber-surface">
                        {trip.gallery.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`
                                    w-16 h-12 rounded overflow-hidden border-2 transition-all
                                    ${index === currentImageIndex
                                        ? `${colorClasses.border.replace('/30', '')} shadow-lg`
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                    }
                                `}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48"><rect fill="%230a0a0f" width="64" height="48"/><text x="32" y="28" text-anchor="middle" fill="%2300f5ff" font-family="monospace" font-size="8">IMG</text></svg>';
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trip Description */}
                <div className={`bg-cyber-surface border ${colorClasses.border} rounded-lg p-4`}>
                    <h3 className={`text-sm font-bold ${colorClasses.text} mb-3 uppercase tracking-wider flex items-center gap-2`}>
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        TRAVEL.LOG
                    </h3>
                    <div className="space-y-3 text-sm text-neon-cyan/80 leading-relaxed">
                        {trip.description.map((paragraph, index) => (
                            <p key={index}>
                                {">"} {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Travels App Component
export const TravelsApp: React.FC = () => {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    if (selectedTrip) {
        return (
            <div className="h-full bg-cyber-bg font-mono">
                <TripDetail trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Plane size={24} className="text-neon-cyan" />
                    <h1 className="text-xl font-bold text-neon-cyan font-cyber">TRAVEL_JOURNAL.exe</h1>
                </div>
                <p className="text-sm text-neon-cyan/50">
                    {">"} SECRET UNLOCKED! Welcome to my travel adventures...
                </p>
                <div className="mt-2 text-xs text-neon-magenta/70">
                    🔓 You discovered this hidden section by entering the Konami Code!
                </div>
            </div>

            {/* Trip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TRIPS.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onClick={() => setSelectedTrip(trip)}
                    />
                ))}
            </div>

            {/* Footer hint */}
            <div className="mt-8 text-center text-xs text-neon-cyan/30">
                Click a destination to explore more...
            </div>
        </div>
    );
};
