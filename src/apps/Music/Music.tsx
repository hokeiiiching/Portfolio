import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
    Repeat, Shuffle, Heart, Search, Loader2, Music, TrendingUp,
    AlertCircle
} from 'lucide-react';

interface DeezerTrack {
    id: number;
    title: string;
    title_short: string;
    duration: number;
    preview: string;
    artist: {
        id: number;
        name: string;
        picture_small: string;
    };
    album: {
        id: number;
        title: string;
        cover_small: string;
        cover_medium: string;
    };
}

interface Track {
    id: number;
    title: string;
    artist: string;
    duration: number;
    previewUrl: string;
    albumArt: string;
    albumTitle: string;
}

const formatDuration = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
};

const mapDeezerTrack = (track: DeezerTrack): Track => ({
    id: track.id,
    title: track.title_short || track.title,
    artist: track.artist.name,
    duration: track.duration,
    previewUrl: track.preview,
    albumArt: track.album.cover_medium || track.album.cover_small,
    albumTitle: track.album.title,
});

export const MusicApp: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(75);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [likedTracks, setLikedTracks] = useState<number[]>([]);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [playlist, setPlaylist] = useState<Track[]>([]);
    const [isLoadingCharts, setIsLoadingCharts] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'search' | 'playlist'>('playlist');

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const searchTimeoutRef = useRef<number | null>(null);

    const currentTrack = playlist[currentTrackIndex];

    // Load trending tracks on mount
    useEffect(() => {
        const loadCharts = async () => {
            try {
                setIsLoadingCharts(true);
                setError(null);

                // Try to fetch charts, fallback to search for synthwave
                let response = await fetch('/api/deezer/charts?limit=20');

                if (!response.ok) {
                    // Fallback: search for synthwave if charts fail
                    response = await fetch('/api/deezer/search?q=synthwave&limit=20');
                }

                if (!response.ok) {
                    throw new Error('Failed to load music');
                }

                const data = await response.json();
                const tracks = (data.data || []).map(mapDeezerTrack).filter((t: Track) => t.previewUrl);

                if (tracks.length === 0) {
                    throw new Error('No tracks available');
                }

                setPlaylist(tracks);
            } catch (err) {
                console.error('Error loading charts:', err);
                setError('Could not load music. Try searching for your favorite artist!');
            } finally {
                setIsLoadingCharts(false);
            }
        };

        loadCharts();
    }, []);

    // Handle volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    // Handle play/pause
    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error('Playback failed:', e);
                setError('Playback failed. Click play to retry.');
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    // Search handler with debounce
    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setError(null);

        try {
            const response = await fetch(`/api/deezer/search?q=${encodeURIComponent(query)}&limit=25`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            const tracks = (data.data || []).map(mapDeezerTrack).filter((t: Track) => t.previewUrl);
            setSearchResults(tracks);
        } catch (err) {
            console.error('Search error:', err);
            setError('Search failed. Please try again.');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchQuery.trim()) {
            searchTimeoutRef.current = window.setTimeout(() => {
                handleSearch(searchQuery);
            }, 500);
        } else {
            setSearchResults([]);
        }

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, handleSearch]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const time = audioRef.current.currentTime;
            if (duration > 0) {
                setProgress((time / duration) * 100);
                setCurrentTime(time);
            }
        }
    };

    const handleEnded = () => {
        if (isRepeating) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            handleNext();
        }
    };

    const handlePlayPause = () => {
        if (!currentTrack && playlist.length > 0) {
            setCurrentTrackIndex(0);
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (playlist.length === 0) return;

        if (isShuffled) {
            setCurrentTrackIndex(Math.floor(Math.random() * playlist.length));
        } else {
            setCurrentTrackIndex((currentTrackIndex + 1) % playlist.length);
        }
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (playlist.length === 0) return;

        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
        } else {
            setCurrentTrackIndex((currentTrackIndex - 1 + playlist.length) % playlist.length);
        }
        setIsPlaying(true);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = pct * audioRef.current.duration;
            setProgress(pct * 100);
        }
    };

    const playTrack = (track: Track, fromSearch: boolean = false) => {
        if (fromSearch) {
            // Add to playlist if not already there
            const existingIndex = playlist.findIndex(t => t.id === track.id);
            if (existingIndex === -1) {
                const newPlaylist = [track, ...playlist];
                setPlaylist(newPlaylist);
                setCurrentTrackIndex(0);
            } else {
                setCurrentTrackIndex(existingIndex);
            }
            setActiveTab('playlist');
        } else {
            const index = playlist.findIndex(t => t.id === track.id);
            if (index !== -1) {
                setCurrentTrackIndex(index);
            }
        }
        setIsPlaying(true);
    };

    const toggleLike = (id: number) => {
        setLikedTracks(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const displayTracks = activeTab === 'search' ? searchResults : playlist;

    return (
        <div className="h-full bg-cyber-bg font-mono flex flex-col overflow-hidden">
            {/* Hidden Audio Element */}
            {currentTrack && (
                <audio
                    ref={audioRef}
                    src={currentTrack.previewUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onError={() => setError('Failed to load track')}
                />
            )}

            {/* Search Bar */}
            <div className="p-4 border-b border-primary/20">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value) setActiveTab('search');
                        }}
                        placeholder="Search any artist, song, or album..."
                        className="w-full pl-10 pr-10 py-2.5 bg-cyber-surface border border-primary/30 rounded-lg text-primary placeholder:text-primary/40 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--color-glow)]"
                    />
                    {isSearching && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-spin" size={18} />
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => setActiveTab('playlist')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'playlist'
                            ? 'bg-primary/20 text-primary border border-primary/50'
                            : 'text-primary/50 hover:text-primary hover:bg-primary/10'
                            }`}
                    >
                        <TrendingUp size={14} />
                        Playlist
                    </button>
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'search'
                            ? 'bg-primary/20 text-primary border border-primary/50'
                            : 'text-primary/50 hover:text-primary hover:bg-primary/10'
                            }`}
                    >
                        <Search size={14} />
                        Search Results
                        {searchResults.length > 0 && (
                            <span className="ml-1 px-1.5 py-0.5 bg-secondary/30 rounded text-secondary text-[10px]">
                                {searchResults.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mx-4 mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle size={14} />
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-auto text-red-400/60 hover:text-red-400"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Track List */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                {isLoadingCharts && activeTab === 'playlist' ? (
                    <div className="flex flex-col items-center justify-center h-full text-primary/50 gap-3">
                        <Loader2 className="animate-spin" size={32} />
                        <span className="text-sm">Loading trending tracks...</span>
                    </div>
                ) : displayTracks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-primary/40 gap-3">
                        <Music size={40} />
                        <span className="text-sm">
                            {activeTab === 'search'
                                ? 'Search for your favorite music'
                                : 'No tracks in playlist'}
                        </span>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {displayTracks.map((track) => (
                            <div
                                key={track.id}
                                onClick={() => playTrack(track, activeTab === 'search')}
                                className={`
                                    flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all group
                                    ${currentTrack?.id === track.id
                                        ? 'bg-primary/15 border border-primary/40'
                                        : 'hover:bg-cyber-surface border border-transparent hover:border-primary/20'
                                    }
                                `}
                            >
                                {/* Album Art */}
                                <div className="w-10 h-10 rounded overflow-hidden bg-cyber-surface flex-shrink-0">
                                    {track.albumArt ? (
                                        <img
                                            src={track.albumArt}
                                            alt={track.albumTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary/30">
                                            <Music size={18} />
                                        </div>
                                    )}
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm font-medium truncate ${currentTrack?.id === track.id ? 'text-primary' : 'text-primary/80'
                                        }`}>
                                        {currentTrack?.id === track.id && isPlaying && (
                                            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                                        )}
                                        {track.title}
                                    </div>
                                    <div className="text-xs text-primary/40 truncate">{track.artist}</div>
                                </div>

                                {/* Like Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                                    className={`p-1.5 rounded transition-colors ${likedTracks.includes(track.id)
                                        ? 'text-secondary'
                                        : 'text-primary/20 hover:text-secondary opacity-0 group-hover:opacity-100'
                                        }`}
                                >
                                    <Heart size={14} fill={likedTracks.includes(track.id) ? 'currentColor' : 'none'} />
                                </button>

                                {/* Duration */}
                                <div className="text-xs text-primary/40 w-10 text-right">
                                    {formatDuration(track.duration)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Now Playing Bar */}
            <div className="border-t border-primary/20 bg-cyber-dark/80 backdrop-blur-sm">
                {/* Progress Bar */}
                <div
                    className="h-1 bg-cyber-surface cursor-pointer group"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_var(--color-glow)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="p-3">
                    {/* Track Info */}
                    <div className="flex items-center gap-3 mb-3">
                        {/* Album Art */}
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 flex-shrink-0">
                            <div className="w-full h-full rounded-lg bg-cyber-dark overflow-hidden">
                                {currentTrack?.albumArt ? (
                                    <img
                                        src={currentTrack.albumArt}
                                        alt={currentTrack.albumTitle}
                                        className={`w-full h-full object-cover transition-transform ${isPlaying ? 'scale-105' : 'scale-100'}`}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary/50">
                                        <Music size={24} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-primary truncate">
                                {currentTrack?.title || 'No track selected'}
                            </h3>
                            <p className="text-xs text-secondary truncate">
                                {currentTrack?.artist || 'Select a track to play'}
                            </p>
                        </div>

                        {currentTrack && (
                            <button
                                onClick={() => toggleLike(currentTrack.id)}
                                className={`p-2 rounded-full transition-all ${likedTracks.includes(currentTrack.id)
                                    ? 'text-secondary'
                                    : 'text-primary/40 hover:text-secondary'
                                    }`}
                            >
                                <Heart size={18} fill={likedTracks.includes(currentTrack.id) ? 'currentColor' : 'none'} />
                            </button>
                        )}
                    </div>

                    {/* Time Display */}
                    <div className="flex justify-between text-[10px] text-primary/40 mb-2 px-1">
                        <span>{formatDuration(currentTime)}</span>
                        <span className="text-primary/20">30s preview</span>
                        <span>{currentTrack ? formatDuration(currentTrack.duration > 30 ? 30 : currentTrack.duration) : '0:00'}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        {/* Left Controls */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsShuffled(!isShuffled)}
                                className={`p-2 rounded-full transition-all ${isShuffled ? 'text-primary bg-primary/10' : 'text-primary/40 hover:text-primary'
                                    }`}
                                title="Shuffle"
                            >
                                <Shuffle size={16} />
                            </button>
                        </div>

                        {/* Center Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                className="p-2 text-primary hover:text-secondary transition-all hover:scale-110 active:scale-95"
                            >
                                <SkipBack size={20} />
                            </button>
                            <button
                                onClick={handlePlayPause}
                                disabled={playlist.length === 0}
                                className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-cyber-bg hover:shadow-[0_0_20px_var(--color-glow)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-2 text-primary hover:text-secondary transition-all hover:scale-110 active:scale-95"
                            >
                                <SkipForward size={20} />
                            </button>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsRepeating(!isRepeating)}
                                className={`p-2 rounded-full transition-all ${isRepeating ? 'text-primary bg-primary/10' : 'text-primary/40 hover:text-primary'
                                    }`}
                                title="Repeat"
                            >
                                <Repeat size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="text-primary/60 hover:text-primary transition-colors"
                        >
                            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                setVolume(Number(e.target.value));
                                if (isMuted) setIsMuted(false);
                            }}
                            className="w-24 h-1 bg-cyber-surface rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
