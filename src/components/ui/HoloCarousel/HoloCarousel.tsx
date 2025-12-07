import React, { useRef } from 'react';
import { useSound } from '../../../hooks/useSound';

interface CarouselItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
}

interface HoloCarouselProps {
    items: CarouselItem[];
    onLaunch: (id: string) => void;
}

export const HoloCarousel: React.FC<HoloCarouselProps> = ({ items, onLaunch }) => {
    const { playSound } = useSound();
    const containerRef = useRef<HTMLDivElement>(null);

    // Split items into 3 columns
    const columns = [[], [], []] as CarouselItem[][];
    items.forEach((item, i) => {
        columns[i % 3].push(item);
    });

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center p-12 overflow-y-auto"
        >
            <div className="w-[1000px] grid grid-cols-3 gap-8">
                {columns.map((colItems, colIndex) => (
                    <div
                        key={colIndex}
                        className={`
                            flex flex-col gap-8
                            ${colIndex === 1 ? 'pt-16' : 'pt-0'} 
                        `}
                    >
                        {colItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="
                                    group relative w-full h-64 
                                    bg-cyber-surface/60 backdrop-blur-xl
                                    rounded-2xl border border-white/10
                                    flex flex-col items-center justify-center gap-6
                                    cursor-pointer
                                    transition-all duration-300 ease-out
                                    hover:scale-105 hover:bg-cyber-surface/80
                                    hover:border-neon-cyan/50 hover:shadow-neon-cyan
                                    overflow-hidden
                                "
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => {
                                    onLaunch(item.id);
                                    playSound('click');
                                }}
                                onMouseEnter={() => playSound('hover')}
                            >
                                {/* Holographic Shine Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Background Accent Glow */}
                                <div className={`absolute -inset-1 bg-gradient-to-r from-${item.color}-500/0 via-${item.color}-500/10 to-${item.color}-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                                {/* Icon Container (Floating Effect) */}
                                <div className={`
                                    p-6 rounded-2xl bg-white/5 
                                    ring-1 ring-white/10
                                    shadow-lg
                                    transition-all duration-300
                                    group-hover:scale-110 group-hover:bg-white/10
                                    group-hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)]
                                `}>
                                    {item.icon}
                                </div>

                                {/* Label */}
                                <span className="text-xl font-cyber tracking-wider text-gray-300 group-hover:text-white transition-colors">
                                    {item.label}
                                </span>

                                {/* Decorative Corner Lines */}
                                <div className="absolute top-3 left-3 w-4 h-[1px] bg-white/20 group-hover:w-8 group-hover:bg-neon-cyan transition-all" />
                                <div className="absolute top-3 left-3 w-[1px] h-4 bg-white/20 group-hover:h-8 group-hover:bg-neon-cyan transition-all" />

                                <div className="absolute bottom-3 right-3 w-4 h-[1px] bg-white/20 group-hover:w-8 group-hover:bg-neon-cyan transition-all" />
                                <div className="absolute bottom-3 right-3 w-[1px] h-4 bg-white/20 group-hover:h-8 group-hover:bg-neon-cyan transition-all" />

                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
