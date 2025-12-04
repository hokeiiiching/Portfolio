import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Globe, Send, CheckCircle } from 'lucide-react';

const CONTACTS = [
    {
        id: 'email',
        icon: <Mail size={18} />,
        label: 'Email',
        value: 'hokeiching.work@gmail.com',
        href: 'mailto:hokeiching.work@gmail.com',
        color: 'cyan'
    },
    {
        id: 'phone',
        icon: <Phone size={18} />,
        label: 'Phone',
        value: '(+65) 9680 9818',
        color: 'green'
    },
    {
        id: 'linkedin',
        icon: <Linkedin size={18} />,
        label: 'LinkedIn',
        value: 'ho-kei-ching',
        href: 'https://linkedin.com/in/ho-kei-ching',
        color: 'blue'
    },
    {
        id: 'github',
        icon: <Github size={18} />,
        label: 'GitHub',
        value: 'hokeiiiching',
        href: 'https://github.com/hokeiiiching',
        color: 'magenta'
    },
    {
        id: 'portfolio',
        icon: <Globe size={18} />,
        label: 'Portfolio',
        value: 'hokeiiiching.vercel.app',
        href: 'https://hokeiiiching.vercel.app',
        color: 'pink'
    },
];

export const Contact: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (id: string, value: string) => {
        navigator.clipboard.writeText(value);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const getColorClass = (color: string) => {
        const colors: Record<string, string> = {
            cyan: 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10',
            green: 'border-neon-green/30 text-neon-green hover:bg-neon-green/10',
            blue: 'border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10',
            magenta: 'border-neon-magenta/30 text-neon-magenta hover:bg-neon-magenta/10',
            pink: 'border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10',
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 text-sm text-neon-cyan mb-4">
                    <Send size={14} />
                    CONTACT.MSG
                </div>
                <h1 className="text-xl font-bold text-neon-cyan font-cyber mb-2">
                    GET IN TOUCH
                </h1>
                <p className="text-sm text-neon-cyan/50">
                    Feel free to reach out for collaborations or just a chat!
                </p>
            </div>

            {/* Contact List */}
            <div className="space-y-3">
                {CONTACTS.map(contact => (
                    <div
                        key={contact.id}
                        className={`
              flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer
              bg-cyber-surface ${getColorClass(contact.color)}
            `}
                        onClick={() => {
                            if (contact.href) {
                                window.open(contact.href, '_blank');
                            } else {
                                handleCopy(contact.id, contact.value);
                            }
                        }}
                    >
                        <div className="flex-shrink-0">
                            {contact.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs text-neon-cyan/50 mb-0.5">{contact.label}</div>
                            <div className="text-sm truncate">{contact.value}</div>
                        </div>
                        <div className="flex-shrink-0">
                            {copied === contact.id ? (
                                <CheckCircle size={16} className="text-neon-green" />
                            ) : (
                                contact.href ? (
                                    <span className="text-xs text-neon-cyan/30">[OPEN]</span>
                                ) : (
                                    <span className="text-xs text-neon-cyan/30">[COPY]</span>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-neon-cyan/10 text-center">
                <p className="text-xs text-neon-cyan/30">
                    {">"} Click to copy or open link
                </p>
            </div>
        </div>
    );
};
