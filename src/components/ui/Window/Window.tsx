import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

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
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = Math.max(0, e.clientX - dragOffset.x);
            const newY = Math.max(0, e.clientY - dragOffset.y);
            onPositionChange(id, { x: newX, y: newY });
        };

        const handleMouseUp = () => setIsDragging(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, id, onPositionChange]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setIsDragging(true);
        }
        onFocus(id);
    };

    return (
        <div
            ref={windowRef}
            className={`
        absolute flex flex-col overflow-hidden transition-all duration-200
        ${isMinimized ? 'opacity-0 scale-90 pointer-events-none translate-y-10' : 'opacity-100 scale-100'}
        ${isMaximized ? '!inset-0 !w-full !h-[calc(100%-56px)]' : ''}
        ${isActive
                    ? 'shadow-window border-neon-cyan/50'
                    : 'shadow-lg border-cyber-border/50'
                }
        bg-cyber-dark/95 backdrop-blur-md border rounded-lg
      `}
            style={{
                zIndex,
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
                width: isMaximized ? '100%' : size.width,
                height: isMaximized ? 'calc(100% - 56px)' : size.height,
            }}
            onMouseDown={() => onFocus(id)}
        >
            {/* Title Bar */}
            <div
                className={`
          h-9 flex items-center justify-between px-3 select-none cursor-default
          border-b transition-colors
          ${isActive
                        ? 'bg-cyber-surface border-neon-cyan/30'
                        : 'bg-cyber-dark border-cyber-border'
                    }
        `}
                onMouseDown={handleMouseDown}
            >
                {/* Title */}
                <div className="flex items-center gap-2 text-sm font-mono">
                    <span className={isActive ? 'text-neon-cyan' : 'text-neon-cyan/50'}>
                        {icon}
                    </span>
                    <span className={`truncate ${isActive ? 'text-neon-cyan' : 'text-neon-cyan/50'}`}>
                        {title}
                    </span>
                </div>

                {/* Window Controls */}
                <div className="flex items-center gap-1">
                    <button
                        className="w-7 h-6 flex items-center justify-center rounded hover:bg-neon-yellow/20 
                       text-neon-yellow/60 hover:text-neon-yellow transition-colors"
                        onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                        aria-label="Minimize"
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        className="w-7 h-6 flex items-center justify-center rounded hover:bg-neon-green/20 
                       text-neon-green/60 hover:text-neon-green transition-colors"
                        onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
                        aria-label="Maximize"
                    >
                        {isMaximized ? <Maximize2 size={12} /> : <Square size={12} />}
                    </button>
                    <button
                        className="w-7 h-6 flex items-center justify-center rounded hover:bg-neon-pink/20 
                       text-neon-pink/60 hover:text-neon-pink transition-colors"
                        onClick={(e) => { e.stopPropagation(); onClose(id); }}
                        aria-label="Close"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-cyber-bg/80">
                {children}
            </div>

            {/* Glow effect when active */}
            {isActive && (
                <div className="absolute inset-0 pointer-events-none rounded-lg border border-neon-cyan/20" />
            )}
        </div>
    );
};
