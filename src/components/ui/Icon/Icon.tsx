import React from 'react';


interface IconProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    onDoubleClick: (id: string) => void;
}

export const Icon: React.FC<IconProps> = ({ id, label, icon, onDoubleClick }) => {
    return (
        <div
            className="icon"
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
            <div className="icon__image">
                {icon}
            </div>
            <span className="icon__label">{label}</span>
        </div>
    );
};
