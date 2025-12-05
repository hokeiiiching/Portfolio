import React, { useState, useEffect } from 'react';
import { useSound } from '../../../hooks/useSound';

interface DesktopIconProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    onDoubleClick: (id: string) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, color, onDoubleClick }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [clickTimeout, setClickTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const { playSound } = useSound();

    const getGlowColor = () => {
        switch (color) {
            case 'magenta': return 'shadow-neon-magenta border-neon-magenta/50 bg-neon-magenta/20';
            case 'green': return 'shadow-neon-green border-neon-green/50 bg-neon-green/20';
            case 'yellow': return 'shadow-neon-yellow border-neon-yellow/50 bg-neon-yellow/20';
            case 'pink': return 'shadow-neon-pink border-neon-pink/50 bg-neon-pink/20';
            case 'blue': return 'shadow-neon-blue border-neon-blue/50 bg-neon-blue/20';
            case 'cyan':
            default: return 'shadow-neon-cyan border-neon-cyan/50 bg-neon-cyan/20';
        }
    };

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(`[data-icon-id="${id}"]`)) {
                setIsSelected(false);
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [id]);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(true);
        playSound('click');

        setClickCount(prev => prev + 1);

        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        const timeout = setTimeout(() => {
            setClickCount(0);
            setClickTimeout(null);
        }, 300);

        setClickTimeout(timeout);

        if (clickCount === 1) {
            onDoubleClick(id);
            setClickCount(0);
            if (clickTimeout) clearTimeout(clickTimeout);
        }
    };

    return (
        <div
            data-icon-id={id}
            className={`
                w-24 h-24 flex flex-col items-center justify-center gap-2
                rounded-lg cursor-pointer transition-all duration-200
                hover:bg-neon-cyan/10 group relative
                ${isSelected ? `${getGlowColor()} border shadow-[0_0_15px_rgba(0,0,0,0.3)]` : 'border border-transparent'}
            `}
            onClick={handleClick}
            onMouseEnter={() => playSound('hover')}
        >
            <div className={`
                transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]
                ${isSelected ? 'scale-110 drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]' : ''}
            `}>
                {icon}
            </div>

            <span className={`
                text-xs font-mono text-center px-2 py-0.5 rounded
                ${isSelected
                    ? 'text-neon-cyan bg-black/60 font-bold shadow-[0_0_5px_rgba(0,245,255,0.4)]'
                    : 'text-neon-cyan/80 group-hover:text-neon-cyan group-hover:bg-black/40'}
            `}>
                {label}
            </span>
        </div>
    );
};
