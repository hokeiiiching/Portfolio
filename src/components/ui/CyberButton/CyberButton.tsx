import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const CyberButton: React.FC<CyberButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "w-full py-2 rounded font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 border";

    const variants = {
        primary: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/50 hover:bg-neon-cyan/20",
        secondary: "bg-cyber-surface text-neon-blue border-neon-blue/30 hover:bg-neon-blue/10",
        success: "bg-neon-green/20 text-neon-green border-neon-green/50",
        danger: "bg-neon-pink/10 text-neon-pink border-neon-pink/50 hover:bg-neon-pink/20"
    };

    return (
        <button
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${(isLoading || disabled) ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            {!isLoading && icon && <span>{icon}</span>}
            {children}
        </button>
    );
};
