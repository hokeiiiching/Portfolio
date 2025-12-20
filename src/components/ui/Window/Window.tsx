import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useSettings } from '../../../contexts/SettingsContext';

interface WindowProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isActive: boolean;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onMaximize: (id: string) => void;
    onFocus: (id: string) => void;
    onPositionChange: (id: string, position: { x: number; y: number }) => void;
    children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
    id,
    title,
    icon,
    isMinimized,
    isMaximized,
    zIndex,
    position,
    size,
    isActive,
    onClose,
    onMinimize,
    onMaximize,
    onFocus,
    onPositionChange,
    children,
}) => {
    const { theme } = useSettings();
    const isModernTheme = theme === 'modern';
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [localPos, setLocalPos] = useState(position);
    const localPosRef = useRef(position);

    useEffect(() => {
        localPosRef.current = localPos;
    }, [localPos]);

    useEffect(() => {
        setLocalPos(position);
    }, [position]);

    useEffect(() => {
        if (!isDragging) return;

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'move';

        const handleMouseMove = (e: MouseEvent) => {
            let newX = e.clientX - dragOffset.x;
            let newY = e.clientY - dragOffset.y;

            const SNAP_THRESHOLD = 25;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            if (Math.abs(newX) < SNAP_THRESHOLD) newX = 0;
            if (Math.abs(newY) < SNAP_THRESHOLD) newY = 0;
            if (Math.abs(newX + size.width - screenW) < SNAP_THRESHOLD) newX = screenW - size.width;
            if (Math.abs(newY + size.height - (screenH - 56)) < SNAP_THRESHOLD) newY = screenH - 56 - size.height;

            setLocalPos({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            onPositionChange(id, localPosRef.current);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isDragging, dragOffset, id, onPositionChange, size]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setIsDragging(true);
        }
        onFocus(id);
    };

    // Generate random hex data for decoration (only for non-modern themes)
    const hexData = React.useMemo(() => {
        return Array.from({ length: 8 }, () =>
            Math.random().toString(16).substr(2, 4).toUpperCase()
        );
    }, []);

    const cornerSize = isModernTheme ? 0 : 12;

    // Modern theme: clean, minimal design
    if (isModernTheme) {
        return (
            <div
                ref={windowRef}
                className={`
                    absolute flex flex-col
                    ${isMinimized ? 'opacity-0 scale-90 pointer-events-none translate-y-10' : 'opacity-100 scale-100'}
                    ${isMaximized ? '!inset-0 !w-full !h-[calc(100%-56px)]' : ''}
                `}
                style={{
                    zIndex,
                    left: isMaximized ? 0 : localPos.x,
                    top: isMaximized ? 0 : localPos.y,
                    width: isMaximized ? '100%' : size.width,
                    height: isMaximized ? 'calc(100% - 56px)' : size.height,
                    transition: isDragging ? 'none' : 'all 0.2s ease-out',
                    borderRadius: isMaximized ? 0 : 'var(--border-radius, 12px)',
                }}
                onMouseDown={() => onFocus(id)}
            >
                {/* Modern Window Frame */}
                <div
                    className="relative flex flex-col h-full overflow-hidden"
                    style={{
                        background: 'rgba(30, 41, 59, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: isMaximized ? 0 : 'var(--border-radius, 12px)',
                        boxShadow: isActive
                            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                            : '0 10px 40px -10px rgba(0, 0, 0, 0.4)',
                    }}
                >
                    {/* Clean Header Bar */}
                    <div
                        className="relative flex items-center h-11 select-none cursor-default shrink-0 px-4"
                        style={{
                            background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                        onMouseDown={handleMouseDown}
                    >
                        {/* macOS-style Window Controls - Left */}
                        <div className="flex items-center gap-2 mr-4">
                            <button
                                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
                                onClick={(e) => { e.stopPropagation(); onClose(id); }}
                                aria-label="Close"
                            >
                                <X size={8} className="opacity-0 group-hover:opacity-100 text-red-900" strokeWidth={3} />
                            </button>
                            <button
                                className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
                                onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                                aria-label="Minimize"
                            >
                                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" strokeWidth={3} />
                            </button>
                            <button
                                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center group"
                                onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
                                aria-label="Maximize"
                            >
                                {isMaximized
                                    ? <Maximize2 size={6} className="opacity-0 group-hover:opacity-100 text-green-900" strokeWidth={3} />
                                    : <Square size={6} className="opacity-0 group-hover:opacity-100 text-green-900" strokeWidth={3} />
                                }
                            </button>
                        </div>

                        {/* Icon */}
                        <div
                            className="flex items-center justify-center w-5 h-5 mr-2"
                            style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}
                        >
                            {icon}
                        </div>

                        {/* Title - Centered feel */}
                        <span
                            className="text-sm font-medium truncate"
                            style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)' }}
                        >
                            {title}
                        </span>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
                        <div className="h-full overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Cyberpunk themes: keep all decorations
    return (
        <div
            ref={windowRef}
            className={`
                absolute flex flex-col
                ${isMinimized ? 'opacity-0 scale-90 pointer-events-none translate-y-10' : 'opacity-100 scale-100'}
                ${isMaximized ? '!inset-0 !w-full !h-[calc(100%-56px)]' : ''}
            `}
            style={{
                zIndex,
                left: isMaximized ? 0 : localPos.x,
                top: isMaximized ? 0 : localPos.y,
                width: isMaximized ? '100%' : size.width,
                height: isMaximized ? 'calc(100% - 56px)' : size.height,
                transition: isDragging ? 'none' : 'all 0.2s ease-out',
                // Angular clip-path for chamfered corners
                clipPath: `polygon(
                    ${cornerSize}px 0, 
                    calc(100% - ${cornerSize}px) 0, 
                    100% ${cornerSize}px, 
                    100% calc(100% - ${cornerSize}px), 
                    calc(100% - ${cornerSize}px) 100%, 
                    ${cornerSize}px 100%, 
                    0 calc(100% - ${cornerSize}px), 
                    0 ${cornerSize}px
                )`,
            }}
            onMouseDown={() => onFocus(id)}
        >
            {/* ===== OUTER FRAME ===== */}
            <div
                className="relative flex flex-col h-full overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, 
                        rgba(10, 10, 15, 0.98) 0%, 
                        rgba(15, 20, 30, 0.95) 50%,
                        rgba(10, 10, 15, 0.98) 100%)`,
                    border: `2px solid ${isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: isActive
                        ? `0 0 30px var(--glow-primary), 
                           0 0 60px var(--glow-secondary),
                           inset 0 0 30px rgba(0,0,0,0.5)`
                        : '0 8px 32px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* ===== SCAN LINE EFFECT ===== */}
                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden z-50"
                    style={{ opacity: isActive ? 0.15 : 0.05 }}
                >
                    <div
                        className="absolute w-full h-[2px] animate-scan-line"
                        style={{
                            background: `linear-gradient(90deg, 
                                transparent, 
                                var(--color-primary) 20%, 
                                var(--color-secondary) 50%, 
                                var(--color-primary) 80%, 
                                transparent)`,
                            boxShadow: `0 0 10px var(--color-primary)`,
                        }}
                    />
                </div>

                {/* ===== CIRCUIT PATTERN OVERLAY ===== */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        opacity: isActive ? 0.03 : 0.01,
                        backgroundImage: `
                            linear-gradient(90deg, var(--color-primary) 1px, transparent 1px),
                            linear-gradient(var(--color-primary) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* ===== CORNER DECORATIONS ===== */}
                {/* Top-Left Corner */}
                <svg className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-20" viewBox="0 0 32 32">
                    <path
                        d="M2 16 L2 2 L16 2"
                        fill="none"
                        stroke={isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="2"
                    />
                    <circle cx="2" cy="2" r="2" fill={isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)'} />
                    <path
                        d="M6 12 L6 6 L12 6"
                        fill="none"
                        stroke={isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}
                        strokeWidth="1"
                    />
                </svg>

                {/* Top-Right Corner */}
                <svg className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-20" viewBox="0 0 32 32">
                    <path
                        d="M16 2 L30 2 L30 16"
                        fill="none"
                        stroke={isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="2"
                    />
                    <circle cx="30" cy="2" r="2" fill={isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'} />
                    <path
                        d="M20 6 L26 6 L26 12"
                        fill="none"
                        stroke={isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)'}
                        strokeWidth="1"
                    />
                </svg>

                {/* Bottom-Left Corner */}
                <svg className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none z-20" viewBox="0 0 32 32">
                    <path
                        d="M2 16 L2 30 L16 30"
                        fill="none"
                        stroke={isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="2"
                    />
                    <circle cx="2" cy="30" r="2" fill={isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'} />
                </svg>

                {/* Bottom-Right Corner */}
                <svg className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-20" viewBox="0 0 32 32">
                    <path
                        d="M16 30 L30 30 L30 16"
                        fill="none"
                        stroke={isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="2"
                    />
                    <circle cx="30" cy="30" r="2" fill={isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.2)'} />
                </svg>

                {/* ===== HEADER BAR ===== */}
                <div
                    className="relative flex items-center h-10 select-none cursor-default shrink-0 z-10"
                    style={{
                        background: isActive
                            ? `linear-gradient(90deg, 
                                var(--color-panel) 0%, 
                                rgba(var(--color-primary-rgb, 0, 245, 255), 0.1) 50%,
                                var(--color-panel) 100%)`
                            : 'var(--color-panel)',
                        borderBottom: `1px solid ${isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Left accent bar */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{
                            background: isActive
                                ? `linear-gradient(180deg, var(--color-secondary), var(--color-primary))`
                                : 'transparent'
                        }}
                    />

                    {/* Left data readout */}
                    <div className="flex items-center gap-1 px-3 text-[9px] font-mono opacity-40 tracking-widest">
                        <span style={{ color: 'var(--color-primary)' }}>[</span>
                        <span style={{ color: 'var(--color-secondary)' }}>{hexData[0]}</span>
                        <span style={{ color: 'var(--color-primary)' }}>]</span>
                    </div>

                    {/* Title Section */}
                    <div className="flex items-center gap-2 flex-1">
                        {/* Icon with glow */}
                        <div
                            className="flex items-center justify-center w-5 h-5"
                            style={{
                                color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)',
                                filter: isActive ? 'drop-shadow(0 0 4px var(--color-primary))' : 'none'
                            }}
                        >
                            {icon}
                        </div>

                        {/* Title */}
                        <span
                            className="text-xs font-bold font-mono uppercase tracking-wider truncate"
                            style={{
                                color: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)',
                                textShadow: isActive ? '0 0 10px var(--glow-primary)' : 'none'
                            }}
                        >
                            {title}
                        </span>

                        {/* Status indicators */}
                        <div className="flex items-center gap-1 ml-2">
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: isActive ? 'var(--color-success)' : 'rgba(255,255,255,0.2)',
                                    boxShadow: isActive ? '0 0 6px var(--color-success)' : 'none',
                                    animation: isActive ? 'pulse 2s infinite' : 'none'
                                }}
                            />
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                    boxShadow: isActive ? '0 0 4px var(--color-primary)' : 'none'
                                }}
                            />
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                            />
                        </div>
                    </div>

                    {/* Right data readout */}
                    <div className="flex items-center gap-1 px-2 text-[9px] font-mono opacity-40 tracking-widest">
                        <span style={{ color: 'var(--color-primary)' }}>{hexData[1]}</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>:</span>
                        <span style={{ color: 'var(--color-secondary)' }}>{hexData[2]}</span>
                    </div>

                    {/* Window Controls */}
                    <div className="flex items-center h-full">
                        {/* Separator */}
                        <div
                            className="w-px h-6 mr-1"
                            style={{ background: 'rgba(255,255,255,0.1)' }}
                        />

                        <button
                            className="group relative w-8 h-8 flex items-center justify-center transition-all"
                            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                            aria-label="Minimize"
                        >
                            <div
                                className="absolute inset-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: 'rgba(255, 255, 0, 0.1)',
                                    border: '1px solid rgba(255, 255, 0, 0.3)'
                                }}
                            />
                            <Minus size={12} strokeWidth={2.5} style={{ color: 'var(--color-warning)' }} />
                        </button>

                        <button
                            className="group relative w-8 h-8 flex items-center justify-center transition-all"
                            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
                            aria-label="Maximize"
                        >
                            <div
                                className="absolute inset-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: 'rgba(0, 255, 159, 0.1)',
                                    border: '1px solid rgba(0, 255, 159, 0.3)'
                                }}
                            />
                            {isMaximized
                                ? <Maximize2 size={10} strokeWidth={2.5} style={{ color: 'var(--color-success)' }} />
                                : <Square size={10} strokeWidth={2.5} style={{ color: 'var(--color-success)' }} />
                            }
                        </button>

                        <button
                            className="group relative w-8 h-8 flex items-center justify-center transition-all"
                            onClick={(e) => { e.stopPropagation(); onClose(id); }}
                            aria-label="Close"
                        >
                            <div
                                className="absolute inset-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: 'rgba(255, 20, 147, 0.1)',
                                    border: '1px solid rgba(255, 20, 147, 0.3)'
                                }}
                            />
                            <X size={12} strokeWidth={2.5} style={{ color: 'var(--color-accent)' }} />
                        </button>
                    </div>
                </div>

                {/* ===== TOP ACCENT LINE ===== */}
                <div
                    className="h-[2px] shrink-0 relative overflow-hidden"
                    style={{
                        background: isActive
                            ? `linear-gradient(90deg, 
                                transparent, 
                                var(--color-secondary) 15%, 
                                var(--color-primary) 50%, 
                                var(--color-secondary) 85%, 
                                transparent)`
                            : 'transparent'
                    }}
                >
                    {/* Animated glow dot */}
                    {isActive && (
                        <div
                            className="absolute top-0 w-4 h-full animate-glow-travel"
                            style={{
                                background: 'var(--color-primary)',
                                boxShadow: '0 0 10px var(--color-primary), 0 0 20px var(--color-primary)',
                                filter: 'blur(2px)'
                            }}
                        />
                    )}
                </div>

                {/* ===== INNER FRAME / CONTENT WRAPPER ===== */}
                <div className="flex-1 relative overflow-hidden m-1" style={{ background: 'var(--color-bg)' }}>
                    {/* Inner frame border */}
                    <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            border: `1px solid ${isActive ? 'rgba(var(--color-primary-rgb, 0, 245, 255), 0.2)' : 'rgba(255,255,255,0.05)'}`,
                        }}
                    />

                    {/* Content */}
                    <div className="h-full overflow-auto relative z-0">
                        {children}
                    </div>
                </div>

                {/* ===== BOTTOM ACCENT LINE ===== */}
                <div
                    className="h-[2px] shrink-0"
                    style={{
                        background: isActive
                            ? `linear-gradient(90deg, 
                                var(--color-secondary), 
                                transparent 30%, 
                                transparent 70%, 
                                var(--color-primary))`
                            : 'transparent'
                    }}
                />

                {/* ===== FOOTER STATUS BAR ===== */}
                <div
                    className="flex items-center justify-between h-6 px-3 shrink-0 z-10"
                    style={{
                        background: 'var(--color-panel)',
                        borderTop: `1px solid ${isActive ? 'rgba(var(--color-primary-rgb, 0, 245, 255), 0.2)' : 'rgba(255,255,255,0.05)'}`,
                    }}
                >
                    {/* Left status data */}
                    <div className="flex items-center gap-2 text-[8px] font-mono tracking-wider opacity-40">
                        <span style={{ color: 'var(--color-primary)' }}>SYS</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                        <span style={{ color: 'var(--color-secondary)' }}>{hexData[3]}:{hexData[4]}</span>
                    </div>

                    {/* Center indicator */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 h-1"
                                style={{
                                    background: isActive && i < 3
                                        ? 'var(--color-primary)'
                                        : 'rgba(255,255,255,0.1)',
                                    boxShadow: isActive && i < 3 ? '0 0 3px var(--color-primary)' : 'none'
                                }}
                            />
                        ))}
                    </div>

                    {/* Right status data */}
                    <div className="flex items-center gap-2 text-[8px] font-mono tracking-wider opacity-40">
                        <span style={{ color: 'var(--color-success)' }}>●</span>
                        <span style={{ color: 'var(--color-primary)' }}>ACTIVE</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                        <span style={{ color: 'var(--color-secondary)' }}>{hexData[5]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
