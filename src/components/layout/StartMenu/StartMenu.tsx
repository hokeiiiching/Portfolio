import React from 'react';
import { User, FileText, Code, Mail, Settings, Power } from 'lucide-react';

interface StartMenuProps {
    isOpen: boolean;
    onAppClick: (appId: string) => void;
}

const MENU_ITEMS = [
    { id: 'resume', label: 'Resume', icon: <FileText size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
];

const TILES = [
    { id: 'resume', label: 'Resume', icon: <FileText size={32} />, size: 'large' },
    { id: 'projects', label: 'Projects', icon: <Code size={32} />, size: 'large' },
    { id: 'contact', label: 'Contact Me', icon: <Mail size={32} />, size: 'medium' },
];

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onAppClick }) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute bottom-12 left-0 w-[600px] bg-win-start/98 backdrop-blur-xl shadow-start z-[1100] flex"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left Side - App List */}
            <div className="w-64 flex flex-col">
                {/* User Profile */}
                <div className="p-4 flex items-center gap-3 hover:bg-white/5 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-win-accent flex items-center justify-center">
                        <User size={20} className="text-white" />
                    </div>
                    <span className="text-white font-medium">Ho Kei Ching</span>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-2">
                    <div className="px-4 py-2 text-xs text-win-text-muted uppercase tracking-wider">
                        Quick Access
                    </div>
                    {MENU_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 text-left transition-colors"
                            onClick={() => onAppClick(item.id)}
                        >
                            <span className="text-white">{item.icon}</span>
                            <span className="text-white text-sm">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Bottom Actions */}
                <div className="border-t border-white/10">
                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 text-left">
                        <Settings size={20} className="text-white" />
                        <span className="text-white text-sm">Settings</span>
                    </button>
                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 text-left">
                        <Power size={20} className="text-white" />
                        <span className="text-white text-sm">Power</span>
                    </button>
                </div>
            </div>

            {/* Right Side - Tiles */}
            <div className="flex-1 bg-black/20 p-4">
                <div className="text-sm text-win-text-muted mb-3">Portfolio</div>
                <div className="grid grid-cols-2 gap-2">
                    {TILES.map(tile => (
                        <button
                            key={tile.id}
                            className={`bg-win-tile hover:bg-win-tile-hover transition-colors flex flex-col items-center justify-center text-white ${tile.size === 'large' ? 'col-span-1 h-28' : 'col-span-1 h-28'
                                }`}
                            onClick={() => onAppClick(tile.id)}
                        >
                            {tile.icon}
                            <span className="text-sm mt-2">{tile.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
