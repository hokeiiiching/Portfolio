import React, { useState, useEffect } from 'react';
import {
    FileCode, Mail, User, Terminal, FolderOpen
} from 'lucide-react';
import { Window } from '../../ui/Window/Window';
import { Taskbar } from '../Taskbar/Taskbar';
import { DesktopIcon } from '../../ui/DesktopIcon/DesktopIcon';
import { Resume } from '../../../apps/Resume/Resume';
import { Projects } from '../../../apps/Projects/Projects';
import { Contact } from '../../../apps/Contact/Contact';
import { TerminalApp } from '../../../apps/Terminal/Terminal';
import { AboutMe } from '../../../apps/AboutMe/AboutMe';

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

const DESKTOP_ICONS = [
    { id: 'about', label: 'About_Me.exe', icon: <User size={36} className="text-neon-cyan" />, color: 'cyan' },
    { id: 'projects', label: 'Projects.dir', icon: <FolderOpen size={36} className="text-neon-magenta" />, color: 'magenta' },
    { id: 'resume', label: 'Resume.pdf', icon: <FileCode size={36} className="text-neon-green" />, color: 'green' },
    { id: 'terminal', label: 'Terminal.sh', icon: <Terminal size={36} className="text-neon-yellow" />, color: 'yellow' },
    { id: 'contact', label: 'Contact.msg', icon: <Mail size={36} className="text-neon-pink" />, color: 'pink' },
];

export const Desktop: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        // Simulated boot sequence
        const timer = setTimeout(() => setBootComplete(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const openApp = (appId: string) => {
        const existingWindow = windows.find(w => w.id === appId);

        if (existingWindow) {
            if (existingWindow.isMinimized) {
                setWindows(prev => prev.map(w =>
                    w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
                ));
            }
            setActiveWindowId(appId);
            setNextZIndex(prev => prev + 1);
            return;
        }

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
                size = { width: 700, height: 450 };
                icon = <Terminal size={14} />;
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
            position: { x: 80 + offset, y: 40 + offset },
            size,
            icon,
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(appId);
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const minimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
        if (activeWindowId === id) setActiveWindowId(null);
    };

    const maximizeWindow = (id: string) => {
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

    if (!bootComplete) {
        return (
            <div className="h-screen w-screen bg-cyber-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl font-cyber font-bold text-neon-cyan neon-text mb-4">
                        HOKEI_OS
                    </div>
                    <div className="text-sm text-neon-cyan/60 font-mono">
                        [████████████████████] LOADING...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="h-screen w-screen relative overflow-hidden flex flex-col bg-cyber-bg cyber-grid"
            style={{
                backgroundImage: `
          linear-gradient(to bottom, rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)),
          url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop')
        `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Scanline effect overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-50 scanline" />

            {/* Desktop Icons */}
            <div className="flex-1 p-6 flex flex-col flex-wrap content-start gap-4">
                {DESKTOP_ICONS.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        id={icon.id}
                        label={icon.label}
                        icon={icon.icon}
                        color={icon.color}
                        onDoubleClick={openApp}
                    />
                ))}
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
            />
        </div>
    );
};
