import React, { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const CyberInput: React.FC<CyberInputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-xs text-neon-cyan/50 mb-1">{label}</label>}
            <input
                className={`
                    w-full bg-cyber-bg border rounded p-2 text-sm text-neon-cyan outline-none transition-colors
                    ${error ? 'border-neon-pink focus:border-neon-pink' : 'border-neon-cyan/30 focus:border-neon-cyan'}
                    ${className}
                `}
                {...props}
            />
            {error && <span className="text-xs text-neon-pink mt-1">{error}</span>}
        </div>
    );
};

interface CyberTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const CyberTextarea: React.FC<CyberTextareaProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-xs text-neon-cyan/50 mb-1">{label}</label>}
            <textarea
                className={`
                    w-full bg-cyber-bg border rounded p-2 text-sm text-neon-cyan outline-none transition-colors resize-none
                    ${error ? 'border-neon-pink focus:border-neon-pink' : 'border-neon-cyan/30 focus:border-neon-cyan'}
                    ${className}
                `}
                {...props}
            />
            {error && <span className="text-xs text-neon-pink mt-1">{error}</span>}
        </div>
    );
};
