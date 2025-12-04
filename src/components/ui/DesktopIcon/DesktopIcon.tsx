import React, { useState } from 'react';

interface DesktopIconProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    color?: string;
    onDoubleClick: (id: string) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
    id,
    label,
    icon,
    color = 'cyan',
    onDoubleClick
}) => {
    const [isSelected, setIsSelected] = useState(false);

    const getGlowClass = () => {
        const glows: Record<string, string> = {
            cyan: 'shadow-neon-cyan',
            magenta: 'shadow-neon-magenta',
            pink: 'shadow-neon-pink',
            green: '',
            yellow: '',
        };
        return glows[color] || '';
    };

    return (
        <div
            className={`
        flex flex-col items-center justify-center w-24 p-3 cursor-pointer rounded-lg
        transition-all duration-200 group
        ${isSelected
                    ? `bg-neon-cyan/10 border border-neon-cyan/30 ${getGlowClass()}`
                    : 'hover:bg-white/5 border border-transparent'
                }
      `}
            onClick={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)}
            onDoubleClick={() => onDoubleClick(id)}
            tabIndex={0}
            role="button"
            aria-label={`Open ${label}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onDoubleClick(id);
                }
            }}
        >
            {/* Icon with glow effect */}
            <div className={`
        mb-2 p-2 rounded-lg transition-all duration-200
        ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
      `}>
                {icon}
            </div>

            {/* Label */}
            <span className={`
        text-xs font-mono text-center leading-tight break-words w-full
        transition-colors duration-200
        ${isSelected ? 'text-neon-cyan' : 'text-neon-cyan/70 group-hover:text-neon-cyan'}
      `}>
                {label}
            </span>
        </div>
    );
};
