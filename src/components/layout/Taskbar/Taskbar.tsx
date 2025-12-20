import React, { useState, useEffect } from 'react';
import { useSound } from '../../../hooks/useSound';
import { useSettings } from '../../../contexts/SettingsContext';
import {
    User, FolderOpen, FileCode, Terminal, Mail, Settings,
    Wifi, Volume2, Battery, Cpu,
    Activity, Github, Linkedin, Globe, Search, X
} from 'lucide-react';

interface WindowState {
    id: string;
    title: string;
    isOpen?: boolean;
    isMinimized: boolean;
    icon?: React.ReactNode;
}

interface TaskbarProps {
    windows: WindowState[];
    activeWindowId: string | null;
    onWindowClick: (id: string) => void;
    onAppClick: (id: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const PINNED_APPS = [
    { id: 'about', icon: <User size={20} />, label: 'About Me', color: 'cyan' },
    { id: 'projects', icon: <FolderOpen size={20} />, label: 'Projects', color: 'magenta' },
    { id: 'resume', icon: <FileCode size={20} />, label: 'Resume', color: 'cyan' },
    { id: 'terminal', icon: <Terminal size={20} />, label: 'Terminal', color: 'green' },
    { id: 'contact', icon: <Mail size={20} />, label: 'Contact', color: 'pink' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings', color: 'yellow' },
];

const QUICK_LINKS = [
    { id: 'github', icon: <Github size={16} />, url: 'https://github.com/hokeiiiching', label: 'GitHub' },
    { id: 'linkedin', icon: <Linkedin size={16} />, url: 'https://linkedin.com/in/ho-kei-ching', label: 'LinkedIn' },
    { id: 'portfolio', icon: <Globe size={16} />, url: 'https://hokeiiiching.vercel.app', label: 'Portfolio' },
];

export const Taskbar: React.FC<TaskbarProps> = ({
    windows,
    activeWindowId,
    onWindowClick,
    onAppClick,
    searchTerm,
    onSearchChange,
}) => {
    const [time, setTime] = useState(new Date());
    const [cpuUsage] = useState(Math.floor(Math.random() * 30) + 10);
    const [ramUsage] = useState(Math.floor(Math.random() * 40) + 30);
    const { playSound } = useSound();
    const { theme } = useSettings();
    const isModernTheme = theme === 'modern';

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    // Fixed: explicitly check isOpen === true to properly track open windows
    const openWindows = windows.filter(w => w.isOpen === true);

    const getColorClass = (color: string) => {
        if (isModernTheme) {
            // Modern theme: neutral colors with subtle hover effects
            return 'text-slate-300 hover:text-white hover:bg-white/10';
        }
        // Cyberpunk themes: neon colors
        const colors: Record<string, string> = {
            cyan: 'text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-neon-cyan',
            magenta: 'text-neon-magenta hover:bg-neon-magenta/20 hover:shadow-neon-magenta',
            green: 'text-neon-green hover:bg-neon-green/20',
            yellow: 'text-neon-yellow hover:bg-neon-yellow/20',
            pink: 'text-neon-pink hover:bg-neon-pink/20 hover:shadow-neon-pink',
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div
            className="h-14 backdrop-blur-md flex items-center px-2 z-[1000] relative shrink-0"
            style={{
                background: isModernTheme ? 'rgba(15, 23, 42, 0.9)' : 'var(--color-panel)',
                borderTop: isModernTheme ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-secondary)',
            }}
        >
            {/* Accent line at top - only for non-modern themes */}
            {!isModernTheme && (
                <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, var(--color-secondary), var(--color-primary), transparent)',
                    }}
                />
            )}

            {/* Left Section - Pinned Apps */}
            <div className="flex items-center gap-1 h-full">
                {PINNED_APPS.map(app => {
                    const isOpen = openWindows.some(w => w.id === app.id);
                    const isActive = activeWindowId === app.id;

                    return (
                        <button
                            key={app.id}
                            onClick={() => {
                                playSound('click');
                                isOpen ? onWindowClick(app.id) : onAppClick(app.id);
                            }}
                            onMouseEnter={() => playSound('hover')}
                            className={`
                relative h-10 w-10 flex items-center justify-center rounded
                transition-all duration-200 group
                ${getColorClass(app.color)}
                ${isActive ? 'bg-white/10' : ''}
              `}
                            title={app.label}
                        >
                            {app.icon}

                            {/* Active/Open indicator */}
                            {isOpen && (
                                <div className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all rounded-full
                  ${isModernTheme
                                        ? (isActive ? 'w-6 bg-white' : 'w-2 bg-white/50')
                                        : (isActive ? 'w-6 bg-neon-cyan shadow-neon-cyan' : 'w-2 bg-neon-cyan/50')
                                    }
                `} />
                            )}

                            {/* Tooltip */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs
                             opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none
                             ${isModernTheme
                                    ? 'bg-slate-800 border border-white/10 text-white/90'
                                    : 'bg-cyber-surface border border-neon-cyan/30 text-neon-cyan'
                                }`}>
                                {app.label}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Separator */}
            <div className={`w-px h-8 mx-3 ${isModernTheme ? 'bg-white/10' : 'bg-neon-cyan/20'}`} />

            {/* Center Section - Search Bar + Open Windows */}
            <div className="flex-1 flex items-center gap-3 h-full overflow-x-auto">
                {/* Search Input */}
                <div className="relative flex items-center">
                    <Search size={14} className={`absolute left-3 ${isModernTheme ? 'text-white/40' : 'text-neon-cyan/50'}`} />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        value={searchTerm}
                        onChange={(e) => {
                            onSearchChange(e.target.value);
                            playSound('hover');
                        }}
                        className={`
                            pl-9 pr-8 py-1.5 w-48 backdrop-blur-sm rounded-full
                            focus:outline-none transition-all duration-200
                            ${isModernTheme
                                ? 'bg-white/5 border border-white/10 text-white/90 placeholder-white/30 focus:border-white/20'
                                : 'bg-cyber-surface/60 border border-neon-cyan/30 text-neon-cyan placeholder-neon-cyan/40 focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] font-mono'
                            }
                            text-sm
                        `}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange('')}
                            className={`absolute right-2 transition-colors ${isModernTheme ? 'text-white/40 hover:text-white' : 'text-neon-cyan/50 hover:text-neon-cyan'}`}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Open Windows */}
                {openWindows.filter(w => !PINNED_APPS.some(p => p.id === w.id)).map(win => (
                    <button
                        key={win.id}
                        onClick={() => {
                            playSound('click');
                            onWindowClick(win.id);
                        }}
                        onMouseEnter={() => playSound('hover')}
                        className={`
              h-10 px-3 flex items-center gap-2 rounded transition-all
              ${isModernTheme
                                ? `hover:bg-white/10 text-white/80 ${activeWindowId === win.id ? 'bg-white/10 border border-white/10' : ''}`
                                : `hover:bg-neon-cyan/10 text-neon-cyan ${activeWindowId === win.id ? 'bg-neon-cyan/20 border border-neon-cyan/30' : ''}`
                            }
            `}
                    >
                        {win.icon}
                        <span className={`text-xs truncate max-w-[120px] ${isModernTheme ? '' : 'font-mono'}`}>{win.title}</span>
                    </button>
                ))}
            </div>

            {/* Right Section - System Tray */}
            <div className="flex items-center gap-2 h-full">
                {/* Quick Links */}
                <div className="flex items-center gap-1 px-2 border-x border-neon-cyan/20">
                    {QUICK_LINKS.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            onMouseEnter={() => playSound('hover')}
                            onClick={() => playSound('click')}
                            className="h-8 w-8 flex items-center justify-center rounded 
                        text-neon-cyan/60 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
                            title={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* System Stats */}
                <div className="flex items-center gap-3 px-3 border-r border-neon-cyan/20">
                    <div className="flex items-center gap-1.5 text-xs">
                        <Cpu size={12} className="text-neon-green" />
                        <span className="text-neon-green font-mono">{cpuUsage}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <Activity size={12} className="text-neon-magenta" />
                        <span className="text-neon-magenta font-mono">{ramUsage}%</span>
                    </div>
                </div>

                {/* System Icons */}
                <div className="flex items-center gap-2 text-neon-cyan/60">
                    <Wifi size={14} className="hover:text-neon-cyan transition-colors cursor-pointer" onMouseEnter={() => playSound('hover')} />
                    <Volume2 size={14} className="hover:text-neon-cyan transition-colors cursor-pointer" onMouseEnter={() => playSound('hover')} />
                    <Battery size={14} className="hover:text-neon-cyan transition-colors cursor-pointer" onMouseEnter={() => playSound('hover')} />
                </div>

                {/* Clock */}
                <div className="flex flex-col items-end justify-center px-3 ml-2 h-full cursor-default">
                    <span className="text-sm font-mono text-neon-cyan neon-text tabular-nums">
                        {formatTime(time)}
                    </span>
                    <span className="text-xs font-mono text-neon-cyan/50">
                        {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </div>
        </div>
    );
};
