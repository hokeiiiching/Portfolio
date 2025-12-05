import React from 'react';

interface CyberIconProps {
    size?: number;
    className?: string;
    glowColor?: string;
}

// Cyberpunk User/Profile Icon - Hexagonal avatar frame with circuit lines
export const CyberUserIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#00f5ff'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <path d="M32 2 L58 17 L58 47 L32 62 L6 47 L6 17 Z" fill="none" stroke={glowColor} strokeWidth="2" />
        <path d="M32 8 L52 20 L52 44 L32 56 L12 44 L12 20 Z" fill="rgba(0,245,255,0.1)" stroke={glowColor} strokeWidth="1" opacity="0.6" />
        <circle cx="32" cy="24" r="10" fill={glowColor} opacity="0.8" />
        <ellipse cx="32" cy="48" rx="14" ry="10" fill={glowColor} opacity="0.6" />
        <path d="M6 32 L0 32" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <path d="M58 32 L64 32" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <circle cx="0" cy="32" r="2" fill={glowColor} opacity="0.5" />
        <circle cx="64" cy="32" r="2" fill={glowColor} opacity="0.5" />
    </svg>
);

// Cyberpunk Folder Icon - HUD-style with scan lines
export const CyberFolderIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#ff00ff'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <path d="M4 16 L24 16 L28 10 L56 10 L60 16 L60 54 L4 54 Z" fill="rgba(255,0,255,0.15)" stroke={glowColor} strokeWidth="2" />
        <path d="M4 16 L24 16 L28 10" fill="none" stroke={glowColor} strokeWidth="2" />
        <rect x="8" y="22" width="48" height="28" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="28" x2="54" y2="28" stroke={glowColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="10" y1="34" x2="54" y2="34" stroke={glowColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="10" y1="40" x2="54" y2="40" stroke={glowColor} strokeWidth="0.5" opacity="0.3" />
        <line x1="10" y1="46" x2="54" y2="46" stroke={glowColor} strokeWidth="0.5" opacity="0.3" />
        <path d="M4 20 L4 16 L8 16" stroke={glowColor} strokeWidth="2" fill="none" />
        <path d="M60 20 L60 16 L56 16" stroke={glowColor} strokeWidth="2" fill="none" />
        <path d="M4 50 L4 54 L8 54" stroke={glowColor} strokeWidth="2" fill="none" />
        <path d="M60 50 L60 54 L56 54" stroke={glowColor} strokeWidth="2" fill="none" />
    </svg>
);

// Cyberpunk Terminal Icon
export const CyberTerminalIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#00ff9f'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <rect x="4" y="6" width="56" height="44" rx="2" fill="none" stroke={glowColor} strokeWidth="2" />
        <rect x="8" y="10" width="48" height="36" fill="rgba(0,255,159,0.1)" stroke={glowColor} strokeWidth="1" />
        <text x="12" y="24" fill={glowColor} fontSize="8" fontFamily="monospace" opacity="0.9">&gt;_</text>
        <rect x="24" y="18" width="8" height="8" fill={glowColor} opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1s" repeatCount="indefinite" />
        </rect>
        <text x="12" y="34" fill={glowColor} fontSize="6" fontFamily="monospace" opacity="0.5">01001</text>
        <text x="12" y="42" fill={glowColor} fontSize="6" fontFamily="monospace" opacity="0.3">10110</text>
        <path d="M24 50 L24 56 L16 58 L48 58 L40 56 L40 50" fill="none" stroke={glowColor} strokeWidth="2" />
        <circle cx="54" cy="52" r="2" fill={glowColor}>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
    </svg>
);

// Cyberpunk Document/Resume Icon
export const CyberDocumentIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#00f5ff'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <path d="M12 4 L42 4 L52 14 L52 60 L12 60 Z" fill="rgba(0,245,255,0.1)" stroke={glowColor} strokeWidth="2" />
        <path d="M42 4 L42 14 L52 14" fill="none" stroke={glowColor} strokeWidth="2" />
        <line x1="18" y1="24" x2="46" y2="24" stroke={glowColor} strokeWidth="2" opacity="0.8" />
        <line x1="18" y1="32" x2="42" y2="32" stroke={glowColor} strokeWidth="1.5" opacity="0.6" />
        <line x1="18" y1="40" x2="44" y2="40" stroke={glowColor} strokeWidth="1.5" opacity="0.6" />
        <line x1="18" y1="48" x2="38" y2="48" stroke={glowColor} strokeWidth="1.5" opacity="0.6" />
        <rect x="18" y="52" width="12" height="6" fill={glowColor} opacity="0.4" />
        <line x1="20" y1="55" x2="28" y2="55" stroke={glowColor} strokeWidth="1" />
        <path d="M8 8 L8 4 L12 4" stroke={glowColor} strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M8 56 L8 60 L12 60" stroke={glowColor} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
);

// Cyberpunk Message/Contact Icon
export const CyberMessageIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#ff1493'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <rect x="4" y="16" width="56" height="36" fill="rgba(255,20,147,0.1)" stroke={glowColor} strokeWidth="2" rx="2" />
        <path d="M4 16 L32 36 L60 16" fill="none" stroke={glowColor} strokeWidth="2" />
        <path d="M4 52 L24 36" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <path d="M60 52 L40 36" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <circle cx="32" cy="38" r="6" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.7" />
        <path d="M32 34 Q38 34 38 40 Q38 44 34 44 Q30 44 30 40 Q30 36 34 36" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.7" />
        <path d="M50 8 Q56 8 56 14" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.6" />
        <path d="M54 4 Q62 4 62 12" fill="none" stroke={glowColor} strokeWidth="1.5" opacity="0.4" />
        <circle cx="56" cy="12" r="4" fill={glowColor}>
            <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
        </circle>
    </svg>
);

// Cyberpunk Settings/Gear Icon
export const CyberSettingsIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#ffff00'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <path
            d="M32 4 L36 4 L38 10 L44 12 L48 8 L52 12 L48 18 L52 24 L58 24 L60 28 L60 36 L54 38 L52 44 L58 48 L54 54 L48 50 L42 54 L40 60 L36 60 L32 60 L28 60 L24 60 L22 54 L16 50 L10 54 L6 48 L12 44 L10 38 L4 36 L4 28 L6 24 L12 24 L16 18 L12 12 L16 8 L20 12 L26 10 L28 4 Z"
            fill="rgba(255,255,0,0.1)"
            stroke={glowColor}
            strokeWidth="2"
        />
        <circle cx="32" cy="32" r="12" fill="none" stroke={glowColor} strokeWidth="2" />
        <circle cx="32" cy="32" r="6" fill={glowColor} opacity="0.3" />
        <line x1="32" y1="20" x2="32" y2="26" stroke={glowColor} strokeWidth="1" opacity="0.7" />
        <line x1="32" y1="38" x2="32" y2="44" stroke={glowColor} strokeWidth="1" opacity="0.7" />
        <line x1="20" y1="32" x2="26" y2="32" stroke={glowColor} strokeWidth="1" opacity="0.7" />
        <line x1="38" y1="32" x2="44" y2="32" stroke={glowColor} strokeWidth="1" opacity="0.7" />
        <circle cx="32" cy="32" r="16" fill="none" stroke={glowColor} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite" />
        </circle>
    </svg>
);

// Cyberpunk Skills/Database Icon
export const CyberSkillsIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#00f5ff'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <ellipse cx="32" cy="16" rx="24" ry="8" fill="rgba(0,245,255,0.1)" stroke={glowColor} strokeWidth="2" />
        <path d="M8 16 L8 48 Q8 56 32 56 Q56 56 56 48 L56 16" fill="none" stroke={glowColor} strokeWidth="2" />
        <ellipse cx="32" cy="48" rx="24" ry="8" fill="none" stroke={glowColor} strokeWidth="2" opacity="0.5" />
        <ellipse cx="32" cy="32" rx="24" ry="8" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.3" />
        {/* Data bars */}
        <rect x="16" y="24" width="8" height="20" fill={glowColor} opacity="0.6">
            <animate attributeName="height" values="20;28;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="y" values="24;20;24" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect x="28" y="20" width="8" height="28" fill={glowColor} opacity="0.8">
            <animate attributeName="height" values="28;20;28" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="20;24;20" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="22" width="8" height="24" fill={glowColor} opacity="0.7">
            <animate attributeName="height" values="24;30;24" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="y" values="22;18;22" dur="1.8s" repeatCount="indefinite" />
        </rect>
    </svg>
);

// Cyberpunk Music Icon
export const CyberMusicIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#ff6600'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <circle cx="32" cy="32" r="28" fill="none" stroke={glowColor} strokeWidth="2" />
        <circle cx="32" cy="32" r="24" fill="rgba(255,102,0,0.1)" stroke={glowColor} strokeWidth="1" opacity="0.5" />
        <rect x="14" y="28" width="4" height="8" fill={glowColor} opacity="0.9">
            <animate attributeName="height" values="8;16;8" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="28;24;28" dur="0.5s" repeatCount="indefinite" />
        </rect>
        <rect x="22" y="24" width="4" height="16" fill={glowColor} opacity="0.8">
            <animate attributeName="height" values="16;24;16" dur="0.7s" repeatCount="indefinite" />
            <animate attributeName="y" values="24;20;24" dur="0.7s" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="20" width="4" height="24" fill={glowColor} opacity="0.9">
            <animate attributeName="height" values="24;28;24" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="20;18;20" dur="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="38" y="24" width="4" height="16" fill={glowColor} opacity="0.8">
            <animate attributeName="height" values="16;20;16" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="y" values="24;22;24" dur="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="46" y="28" width="4" height="8" fill={glowColor} opacity="0.9">
            <animate attributeName="height" values="8;14;8" dur="0.55s" repeatCount="indefinite" />
            <animate attributeName="y" values="28;25;28" dur="0.55s" repeatCount="indefinite" />
        </rect>
    </svg>
);

// Cyberpunk Games Icon
export const CyberGamesIcon: React.FC<CyberIconProps> = ({
    size = 48,
    className = '',
    glowColor = '#0066ff'
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        style={{ filter: `drop-shadow(0 0 4px ${glowColor}) drop-shadow(0 0 8px ${glowColor})` }}
    >
        <path
            d="M8 24 Q8 16 16 16 L48 16 Q56 16 56 24 L56 36 Q56 48 48 52 L44 54 Q40 56 36 54 L32 52 L28 54 Q24 56 20 54 L16 52 Q8 48 8 36 Z"
            fill="rgba(0,102,255,0.1)"
            stroke={glowColor}
            strokeWidth="2"
        />
        <rect x="14" y="30" width="10" height="4" fill={glowColor} opacity="0.8" />
        <rect x="17" y="27" width="4" height="10" fill={glowColor} opacity="0.8" />
        <circle cx="46" cy="28" r="3" fill={glowColor} opacity="0.8" />
        <circle cx="52" cy="34" r="3" fill={glowColor} opacity="0.8" />
        <circle cx="46" cy="40" r="3" fill={glowColor} opacity="0.8" />
        <circle cx="40" cy="34" r="3" fill={glowColor} opacity="0.8" />
        <rect x="29" y="32" width="6" height="3" rx="1" fill={glowColor} opacity="0.6" />
        <circle cx="32" cy="22" r="2" fill={glowColor}>
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
    </svg>
);

export default {
    CyberUserIcon,
    CyberFolderIcon,
    CyberTerminalIcon,
    CyberDocumentIcon,
    CyberMessageIcon,
    CyberSettingsIcon,
    CyberSkillsIcon,
    CyberMusicIcon,
    CyberGamesIcon,
};
