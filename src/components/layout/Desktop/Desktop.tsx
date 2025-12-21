import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../../hooks/useSound';
import { useSettings } from '../../../contexts/SettingsContext';
import { useKonamiCode } from '../../../hooks/useKonamiCode';
import { useAchievements } from '../../../contexts/AchievementsContext';
import {
    FileCode, Mail, User, Terminal, FolderOpen, Settings,
    FileText, Cpu, Gamepad2, Music,
    RefreshCw, Info, Image, ExternalLink
} from 'lucide-react';
import { Window } from '../../ui/Window/Window';
import { Taskbar } from '../Taskbar/Taskbar';
// import { DesktopIcon } from '../../ui/DesktopIcon/DesktopIcon'; // Removed
import { HoloCarousel } from '../../ui/HoloCarousel/HoloCarousel';
import { useContextMenu } from '../../ui/ContextMenu/ContextMenu';
import { Resume } from '../../../apps/Resume/Resume';
import { Projects } from '../../../apps/Projects/Projects';
import { Contact } from '../../../apps/Contact/Contact';
import { TerminalApp } from '../../../apps/Terminal/Terminal';
import { AboutMe } from '../../../apps/AboutMe/AboutMe';
import { SkillsApp } from '../../../apps/Skills/Skills';
import { MusicApp } from '../../../apps/Music/Music';
import { GamesApp } from '../../../apps/Games/Games';
import { SettingsApp } from '../../../apps/Settings/Settings';
import {
    // CyberIcons imports removed
} from '../../ui/CyberIcons/CyberIcons';

interface WindowState {
    id: string;
    title: string;
    component: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    icon: React.ReactNode;
}

// Desktop icons with cyberpunk SVG icons
// Desktop icons with Lucide icons (Clean, bold, glowing)
const DESKTOP_ICONS = [
    { id: 'about', label: 'About Me', icon: <User size={48} className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]" />, color: 'cyan' },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={48} className="text-neon-magenta drop-shadow-[0_0_10px_rgba(255,0,255,0.6)]" />, color: 'magenta' },
    { id: 'contact', label: 'Contact', icon: <Mail size={48} className="text-neon-pink drop-shadow-[0_0_10px_rgba(255,20,147,0.6)]" />, color: 'pink' },
    { id: 'terminal', label: 'Terminal', icon: <Terminal size={48} className="text-neon-green drop-shadow-[0_0_10px_rgba(0,255,159,0.6)]" />, color: 'green' },
    { id: 'skills', label: 'Skills', icon: <Cpu size={48} className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]" />, color: 'cyan' },
    { id: 'resume', label: 'Resume', icon: <FileText size={48} className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]" />, color: 'cyan' },
    { id: 'music', label: 'Music', icon: <Music size={48} className="text-neon-orange drop-shadow-[0_0_10px_rgba(255,165,0,0.6)]" />, color: 'orange' },
    { id: 'games', label: 'Games', icon: <Gamepad2 size={48} className="text-neon-blue drop-shadow-[0_0_10px_rgba(0,102,255,0.6)]" />, color: 'blue' },
    { id: 'settings', label: 'Settings', icon: <Settings size={48} className="text-neon-yellow drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]" />, color: 'yellow' },
];

// Wallpaper configuration - User can add more images here
const WALLPAPERS = [
    '/wallpapers/1.jpg',
    '/wallpapers/2.jpg',
    '/wallpapers/3.jpg',
];

// Animated wallpaper component
// Animated wallpaper component with smooth cross-fade
const CyberpunkWallpaper = React.memo<{ activeIndex: number }>(({ activeIndex }) => (
    <div className="absolute inset-0 overflow-hidden">
        {WALLPAPERS.map((src, index) => (
            <div
                key={src}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-40 z-10' : 'opacity-0 z-0 delay-1000'
                    }`}
                style={{ backgroundImage: `url(${src})` }}
            >
                {/* Dark overlay for readability - Increased opacity per user request */}
                <div className="absolute inset-0 bg-cyber-bg/80" />
            </div>
        ))}

        {/* Vignette - Static overlay on top of all images */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyber-bg/30 pointer-events-none z-20" />
    </div>
));

export const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [bootProgress, setBootProgress] = useState(0);
    const [isBooting, setIsBooting] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { showContextMenu, ContextMenuComponent } = useContextMenu();
    const { playSound } = useSound();
    const {
        wallpaperIndex, setWallpaperIndex,
        bootSkipped, setBootSkipped,
        scanlinesEnabled
    } = useSettings();
    const { unlockAchievement } = useAchievements();

    // Konami Code - God Mode (opens hidden Travel Journal)
    // Konami Code - God Mode (opens hidden Travel Journal)
    useKonamiCode(() => {
        playSound('success');
        unlockAchievement('konami');
        // Navigate to the hidden travels page
        navigate('/travels');
    });

    // Unlock "First Boot" on mount
    useEffect(() => {
        unlockAchievement('first_boot');
    }, [unlockAchievement]);


    // Boot Sequence Logic
    useEffect(() => {
        if (bootSkipped) {
            setIsBooting(false);
            return;
        }

        const progressInterval = setInterval(() => {
            setBootProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setIsBooting(false);
                        playSound('success'); // Boot complete sound
                    }, 300);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 150);

        return () => clearInterval(progressInterval);
    }, [playSound, bootSkipped]);

    // Wallpaper Slideshow Effect
    useEffect(() => {
        if (isBooting) return;

        const interval = setInterval(() => {
            setWallpaperIndex((wallpaperIndex + 1) % WALLPAPERS.length);
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval);
    }, [isBooting, wallpaperIndex, setWallpaperIndex]);

    const openApp = (appId: string) => {
        const existingWindow = windows.find(w => w.id === appId);

        if (existingWindow) {
            if (existingWindow.isMinimized) {
                setWindows(prev => prev.map(w =>
                    w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
                ));
                playSound('click');
            }
            setActiveWindowId(appId);
            setNextZIndex(prev => prev + 1);
            return;
        }

        playSound('click');
        unlockAchievement('explorer'); // Track app open

        let component: React.ReactNode;
        let title: string;
        let size = { width: 800, height: 550 };
        let icon: React.ReactNode;

        switch (appId) {
            case 'about':
                component = <AboutMe />;
                title = 'about_me.exe';
                icon = <User size={14} />;
                break;
            case 'resume':
                component = <Resume />;
                title = 'resume.pdf';
                icon = <FileCode size={14} />;
                break;
            case 'projects':
                component = <Projects />;
                title = 'projects/';
                size = { width: 900, height: 600 };
                icon = <FolderOpen size={14} />;
                break;
            case 'contact':
                component = <Contact />;
                title = 'contact.msg';
                size = { width: 500, height: 450 };
                icon = <Mail size={14} />;
                break;
            case 'terminal':
                component = <TerminalApp />;
                title = 'terminal@hokei:~$';
                size = { width: 750, height: 500 };
                icon = <Terminal size={14} />;
                break;
            case 'settings':
                component = <SettingsApp />;
                title = 'settings.cfg';
                size = { width: 500, height: 450 };
                icon = <Settings size={14} />;
                break;
            case 'skills':
                component = <SkillsApp />;
                title = 'skills.db';
                size = { width: 600, height: 550 };
                icon = <Cpu size={14} />;
                break;
            case 'music':
                component = <MusicApp />;
                title = 'music.app';
                size = { width: 400, height: 600 };
                icon = <Music size={14} />;
                break;
            case 'games':
                component = <GamesApp />;
                title = 'arcade.exe';
                size = { width: 500, height: 500 };
                icon = <Gamepad2 size={14} />;
                break;
            default:
                return;
        }

        const offset = windows.filter(w => w.isOpen).length * 30;
        const newWindow: WindowState = {
            id: appId,
            title,
            component,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZIndex,
            position: { x: 100 + offset, y: 60 + offset },
            size,
            icon,
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(appId);
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (id: string) => {
        playSound('close');
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const minimizeWindow = (id: string) => {
        playSound('close');
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const maximizeWindow = (id: string) => {
        playSound('click');
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
        focusWindow(id);
    };

    const focusWindow = (id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
        ));
        setActiveWindowId(id);
        setNextZIndex(prev => prev + 1);
    };

    const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
    };

    // Desktop context menu
    const handleDesktopContextMenu = (e: React.MouseEvent) => {
        playSound('click');
        showContextMenu(e, [
            { label: 'Refresh', icon: <RefreshCw size={14} />, action: () => window.location.reload() },
            { divider: true },
            { label: 'Open Terminal', icon: <Terminal size={14} />, action: () => openApp('terminal') },
            { label: 'Open Settings', icon: <Settings size={14} />, action: () => openApp('settings') },
            { divider: true },
            { label: 'Change Wallpaper', icon: <Image size={14} />, disabled: true },
            { divider: true },
            { label: 'About HOKEI_OS', icon: <Info size={14} />, action: () => openApp('about') },
            { label: 'View on GitHub', icon: <ExternalLink size={14} />, action: () => window.open('https://github.com/hokeiiiching', '_blank') },
        ]);
    };

    // Icon context menu
    /* Unused
    // Icon context menu
    const handleIconContextMenu = (e: React.MouseEvent, iconId: string, iconLabel: string) => {
        e.stopPropagation();
        playSound('click');
        showContextMenu(e, [
            { label: 'Open', icon: <ExternalLink size={14} />, action: () => openApp(iconId) },
            { divider: true },
            { label: 'Copy Name', icon: <Copy size={14} />, action: () => navigator.clipboard.writeText(iconLabel) },
            { divider: true },
            { label: 'Delete', icon: <Trash2 size={14} />, disabled: true },
        ]);
    };
    */

    if (isBooting) {
        return (
            <div className="h-screen w-screen bg-cyber-bg flex items-center justify-center">
                <div className="text-center w-80">
                    <div className="mb-8">
                        <div className="text-5xl font-cyber font-bold text-neon-cyan neon-text mb-2">
                            HOKEI_OS
                        </div>
                        <div className="text-sm text-neon-magenta font-mono">
                            v2.0.25 // Portfolio Edition
                        </div>
                    </div>

                    <div className="relative h-2 bg-cyber-surface rounded-full overflow-hidden border border-neon-cyan/30">
                        <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-150"
                            style={{ width: `${Math.min(bootProgress, 100)}%` }}
                        />
                    </div>

                    <div className="mt-4 text-xs text-neon-cyan/60 font-mono text-left space-y-1">
                        <p className={bootProgress > 10 ? 'text-neon-cyan/80' : 'text-neon-cyan/30'}>
                            [OK] Initializing system components...
                        </p>
                        <p className={bootProgress > 30 ? 'text-neon-cyan/80' : 'text-neon-cyan/30'}>
                            [OK] Loading cyberpunk interface...
                        </p>
                        <p className={bootProgress > 50 ? 'text-neon-cyan/80' : 'text-neon-cyan/30'}>
                            [OK] Mounting portfolio data...
                        </p>
                        <p className={bootProgress > 70 ? 'text-neon-cyan/80' : 'text-neon-cyan/30'}>
                            [OK] Starting desktop environment...
                        </p>
                        <p className={bootProgress > 90 ? 'text-neon-green' : 'text-neon-cyan/30'}>
                            {bootProgress > 90 ? '[READY] Welcome, User.' : '[....] Finalizing...'}
                        </p>
                    </div>

                    {/* Skip Boot Button */}
                    <button
                        onClick={() => {
                            setBootSkipped(true);
                            playSound('click');
                        }}
                        className="mt-8 text-[10px] text-neon-cyan/40 hover:text-neon-cyan uppercase tracking-widest border border-transparent hover:border-neon-cyan/30 px-3 py-1 rounded transition-all"
                    >
                        [ Skip Boot Sequence ]
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="h-screen w-screen relative overflow-hidden flex flex-col"
            onContextMenu={handleDesktopContextMenu}
        >
            {/* Animated Cyberpunk Wallpaper */}
            <CyberpunkWallpaper activeIndex={wallpaperIndex} />

            {/* Scanline effect overlay */}
            {scanlinesEnabled && (
                <div className="absolute inset-0 pointer-events-none opacity-30 scanline" />
            )}

            {/* Desktop Icons - Holographic Carousel */}
            <div className="flex-1 relative z-10">
                <HoloCarousel items={DESKTOP_ICONS} onLaunch={openApp} searchTerm={searchTerm} />
            </div>

            {/* Windows */}
            {windows.filter(w => w.isOpen).map(win => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    icon={win.icon}
                    isMinimized={win.isMinimized}
                    isMaximized={win.isMaximized}
                    zIndex={win.zIndex}
                    position={win.position}
                    size={win.size}
                    isActive={activeWindowId === win.id}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    onMaximize={maximizeWindow}
                    onFocus={focusWindow}
                    onPositionChange={updateWindowPosition}
                >
                    {win.component}
                </Window>
            ))}

            {/* Taskbar */}
            <Taskbar
                windows={windows}
                activeWindowId={activeWindowId}
                onWindowClick={focusWindow}
                onAppClick={openApp}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {/* Context Menu */}
            {ContextMenuComponent}
        </div>
    );
};
