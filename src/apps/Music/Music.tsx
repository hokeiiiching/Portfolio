import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Shuffle, Heart } from 'lucide-react';

interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
    genre: string;
    url: string;
}

const PLAYLIST: Track[] = [
    {
        id: 1,
        title: 'Neon Dreams',
        artist: 'Synthwave Corp',
        duration: '3:45',
        genre: 'Synthwave',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3' // Placeholder: Cyberpunk City
    },
    {
        id: 2,
        title: 'Digital Rain',
        artist: 'Cyber Pulse',
        duration: '4:12',
        genre: 'Cyberpunk',
        url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3' // Placeholder: Future Bass
    },
    {
        id: 3,
        title: 'Night City Lights',
        artist: 'Retro Future',
        duration: '3:58',
        genre: 'Synthwave',
        url: 'https://cdn.pixabay.com/download/audio/2021/11/24/audio_8231572901.mp3' // Placeholder: Retro Synth
    },
    {
        id: 4,
        title: 'Binary Sunset',
        artist: 'Code Runner',
        duration: '5:23',
        genre: 'Ambient',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_ad2452e9a9.mp3' // Placeholder: Deep Space
    },
];

export const MusicApp: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(75);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [likedTracks, setLikedTracks] = useState<number[]>([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const track = PLAYLIST[currentTrack];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.error("Playback failed:", e));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        }
    };

    const handleEnded = () => {
        if (isRepeating) {
            audioRef.current?.play();
        } else {
            handleNext();
        }
    };

    const handlePlayPause = () => setIsPlaying(!isPlaying);

    const handleNext = () => {
        if (isShuffled) {
            setCurrentTrack(Math.floor(Math.random() * PLAYLIST.length));
        } else {
            setCurrentTrack((currentTrack + 1) % PLAYLIST.length);
        }
        // Auto-play next track
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
        } else {
            setCurrentTrack((currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length);
        }
        setIsPlaying(true);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width);
        if (audioRef.current) {
            audioRef.current.currentTime = pct * audioRef.current.duration;
            setProgress(pct * 100);
        }
    };

    const toggleLike = (id: number) => {
        setLikedTracks(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full bg-cyber-bg font-mono flex flex-col">
            <audio
                ref={audioRef}
                src={track.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />

            {/* Now Playing */}
            <div className="p-6 border-b border-neon-cyan/20">
                <div className="flex items-center gap-4">
                    {/* Album Art */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta p-0.5 relative overflow-hidden group">
                        <div className="w-full h-full rounded-lg bg-cyber-dark flex items-center justify-center relative z-10">
                            <div className={`text-2xl transition-all duration-500 ${isPlaying ? 'scale-110' : 'scale-100'}`}>
                                🎵
                            </div>
                        </div>
                        {/* Visualizer bars simulation */}
                        {isPlaying && (
                            <div className="absolute inset-0 flex items-end justify-center gap-0.5 opacity-50 z-0">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-neon-cyan animate-pulse"
                                        style={{
                                            height: `${Math.random() * 100}%`,
                                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-neon-cyan">{track.title}</h2>
                        <p className="text-sm text-neon-magenta">{track.artist}</p>
                        <p className="text-xs text-neon-cyan/40">{track.genre}</p>
                    </div>

                    <button
                        onClick={() => toggleLike(track.id)}
                        className={`p-2 rounded-full transition-all ${likedTracks.includes(track.id)
                            ? 'text-neon-pink'
                            : 'text-neon-cyan/40 hover:text-neon-pink'
                            }`}
                    >
                        <Heart size={20} fill={likedTracks.includes(track.id) ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="h-1 bg-cyber-surface rounded-full overflow-hidden cursor-pointer group"
                        onClick={handleSeek}>
                        <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-neon-cyan/40">
                        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                        <span>{track.duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`p-2 rounded-full transition-all ${isShuffled ? 'text-neon-cyan' : 'text-neon-cyan/40 hover:text-neon-cyan'
                            }`}
                    >
                        <Shuffle size={18} />
                    </button>
                    <button onClick={handlePrev} className="p-2 text-neon-cyan hover:text-neon-magenta transition-all">
                        <SkipBack size={24} />
                    </button>
                    <button
                        onClick={handlePlayPause}
                        className="p-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-cyber-bg hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all active:scale-95"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button onClick={handleNext} className="p-2 text-neon-cyan hover:text-neon-magenta transition-all">
                        <SkipForward size={24} />
                    </button>
                    <button
                        onClick={() => setIsRepeating(!isRepeating)}
                        className={`p-2 rounded-full transition-all ${isRepeating ? 'text-neon-cyan' : 'text-neon-cyan/40 hover:text-neon-cyan'
                            }`}
                    >
                        <Repeat size={18} />
                    </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 mt-4 justify-center group">
                    <Volume2 size={16} className="text-neon-cyan/60 group-hover:text-neon-cyan transition-colors" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-24 accent-neon-cyan h-1 bg-cyber-surface rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            {/* Playlist */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                <h3 className="text-sm text-neon-magenta mb-3 font-bold tracking-wider">PLAYLIST</h3>
                <div className="space-y-1">
                    {PLAYLIST.map((t, i) => (
                        <div
                            key={t.id}
                            onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
                            className={`
                                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                                ${i === currentTrack
                                    ? 'bg-neon-cyan/10 border border-neon-cyan/30'
                                    : 'hover:bg-cyber-surface border border-transparent'
                                }
                            `}
                        >
                            <div className={`w-6 text-center text-xs ${i === currentTrack ? 'text-neon-cyan' : 'text-neon-cyan/40'}`}>
                                {i === currentTrack && isPlaying ? (
                                    <span className="animate-pulse">▶</span>
                                ) : (
                                    i + 1
                                )}
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm font-medium ${i === currentTrack ? 'text-neon-cyan' : 'text-neon-cyan/80'}`}>
                                    {t.title}
                                </div>
                                <div className="text-xs text-neon-cyan/40">{t.artist}</div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}
                                className={likedTracks.includes(t.id) ? 'text-neon-pink' : 'text-neon-cyan/20 hover:text-neon-pink'}
                            >
                                <Heart size={14} fill={likedTracks.includes(t.id) ? 'currentColor' : 'none'} />
                            </button>
                            <div className="text-xs text-neon-cyan/40">{t.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
