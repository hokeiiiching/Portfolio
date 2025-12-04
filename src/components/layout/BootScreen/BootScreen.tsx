import React, { useState, useEffect } from 'react';

interface BootScreenProps {
    onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('Initializing system...');

    useEffect(() => {
        const duration = 2500; // 2.5 seconds boot time
        const interval = 50;
        const steps = duration / interval;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 500);
                    return 100;
                }

                // Random text updates
                if (next > 20 && next < 25) setText('Loading kernel...');
                if (next > 40 && next < 45) setText('Mounting file system...');
                if (next > 60 && next < 65) setText('Starting user interface...');
                if (next > 80 && next < 85) setText('Welcome, Ho Kei Ching');

                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black text-white z-[9999] flex flex-col items-center justify-center font-mono">
            <div className="text-6xl font-bold mb-8 animate-pulse">HKC OS</div>
            <div className="w-[200px] h-1 bg-gray-800 rounded-sm overflow-hidden mb-4">
                <div
                    className="h-full bg-primary transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="text-sm text-gray-400 h-6">{text}</div>
        </div>
    );
};
