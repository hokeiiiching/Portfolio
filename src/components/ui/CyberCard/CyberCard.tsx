import React, { type HTMLAttributes } from 'react';

interface CyberCardProps extends HTMLAttributes<HTMLElement> {
    color?: 'cyan' | 'magenta' | 'green' | 'pink' | 'blue';
    hoverEffect?: boolean;
}

export const CyberCard: React.FC<CyberCardProps> = ({
    children,
    color = 'cyan',
    hoverEffect = true,
    className = '',
    ...props
}) => {
    const colors = {
        cyan: 'border-neon-cyan/30',
        magenta: 'border-neon-magenta/30',
        green: 'border-neon-green/30',
        pink: 'border-neon-pink/30',
        blue: 'border-neon-blue/30',
    };

    return (
        <article
            className={`
                bg-cyber-surface border ${colors[color]} rounded-lg overflow-hidden
                ${hoverEffect ? 'hover:border-opacity-60 transition-all duration-200' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </article>
    );
};
