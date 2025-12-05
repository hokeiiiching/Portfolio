import React, { useState, useEffect, useRef } from 'react';

interface MenuItem {
    label?: string;
    icon?: React.ReactNode;
    action?: () => void;
    divider?: boolean;
    disabled?: boolean;
    submenu?: MenuItem[];
}

interface ContextMenuProps {
    x: number;
    y: number;
    items: MenuItem[];
    onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState({ x, y });

    useEffect(() => {
        // Adjust position if menu goes off screen
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const newX = x + rect.width > window.innerWidth ? window.innerWidth - rect.width - 10 : x;
            const newY = y + rect.height > window.innerHeight - 56 ? window.innerHeight - rect.height - 66 : y;
            setAdjustedPosition({ x: Math.max(0, newX), y: Math.max(0, newY) });
        }
    }, [x, y]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className="fixed z-[2000] min-w-[180px] bg-cyber-dark/95 backdrop-blur-md border border-neon-cyan/30 rounded-lg shadow-lg overflow-hidden"
            style={{ left: adjustedPosition.x, top: adjustedPosition.y }}
        >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

            <div className="py-1">
                {items.map((item, index) => {
                    if (item.divider) {
                        return <div key={index} className="my-1 h-px bg-neon-cyan/20" />;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if (!item.disabled && item.action) {
                                    item.action();
                                    onClose();
                                }
                            }}
                            disabled={item.disabled}
                            className={`
                                w-full px-4 py-2 text-left text-sm flex items-center gap-3
                                transition-all duration-100
                                ${item.disabled
                                    ? 'text-neon-cyan/30 cursor-not-allowed'
                                    : 'text-neon-cyan/80 hover:bg-neon-cyan/10 hover:text-neon-cyan'
                                }
                            `}
                        >
                            {item.icon && <span className="w-4 h-4 opacity-70">{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Hook to use context menu
export const useContextMenu = () => {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: MenuItem[] } | null>(null);

    const showContextMenu = (e: React.MouseEvent, items: MenuItem[]) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, items });
    };

    const hideContextMenu = () => setContextMenu(null);

    const ContextMenuComponent = contextMenu ? (
        <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={hideContextMenu}
        />
    ) : null;

    return { showContextMenu, hideContextMenu, ContextMenuComponent };
};
