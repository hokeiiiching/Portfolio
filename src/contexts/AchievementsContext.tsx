import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: number;
}

interface AchievementsContextType {
    achievements: Achievement[];
    unlockAchievement: (id: string) => void;
    unlockedCount: number;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
    { id: 'first_boot', title: 'Hello World', description: 'Boot up the system for the first time', icon: '👋' },
    { id: 'hacker', title: 'Script Kiddie', description: 'Run a command in the Terminal', icon: '💻' },
    { id: 'gamer', title: 'Retro Gamer', description: 'Play a game', icon: '🕹️' },
    { id: 'audiophile', title: 'Audiophile', description: 'Listen to some tunes', icon: '🎧' },
    { id: 'konami', title: 'God Mode', description: 'Enter the secret code', icon: '🔓' },
    { id: 'explorer', title: 'Digital Nomad', description: 'Open every app', icon: '🧭' },
];

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);
    const [toast, setToast] = useState<Achievement | null>(null);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('hokei_achievements');
        if (saved) {
            const parsed = JSON.parse(saved);
            setAchievements(prev => prev.map(a => {
                const found = parsed.find((p: any) => p.id === a.id);
                return found ? { ...a, unlockedAt: found.unlockedAt } : a;
            }));
        } else {
            // Unlock first boot immediately if not present
            unlockAchievement('first_boot');
        }
    }, []);

    const unlockAchievement = (id: string) => {
        setAchievements(prev => {
            const achievement = prev.find(a => a.id === id);
            if (!achievement || achievement.unlockedAt) return prev; // Already unlocked or invalid

            const updated = prev.map(a => a.id === id ? { ...a, unlockedAt: Date.now() } : a);

            // Persist
            const unlockedOnly = updated.filter(a => a.unlockedAt).map(a => ({ id: a.id, unlockedAt: a.unlockedAt }));
            localStorage.setItem('hokei_achievements', JSON.stringify(unlockedOnly));

            // Show toast
            setToast({ ...achievement, unlockedAt: Date.now() });
            setTimeout(() => setToast(null), 3000);

            return updated;
        });
    };

    return (
        <AchievementsContext.Provider value={{
            achievements,
            unlockAchievement,
            unlockedCount: achievements.filter(a => a.unlockedAt).length
        }}>
            {children}

            {/* Achievement Toast */}
            {toast && (
                <div className="fixed bottom-20 right-6 z-50 animate-slide-up">
                    <div className="bg-cyber-dark border border-neon-yellow p-4 rounded-lg shadow-[0_0_15px_rgba(255,255,0,0.3)] flex items-center gap-4 max-w-sm">
                        <div className="text-3xl">{toast.icon}</div>
                        <div>
                            <div className="text-xs text-neon-yellow font-bold uppercase tracking-wider">Achievement Unlocked</div>
                            <div className="text-neon-cyan font-bold">{toast.title}</div>
                            <div className="text-xs text-neon-cyan/60">{toast.description}</div>
                        </div>
                    </div>
                </div>
            )}
        </AchievementsContext.Provider>
    );
};

export const useAchievements = () => {
    const context = useContext(AchievementsContext);
    if (!context) throw new Error('useAchievements must be used within AchievementsProvider');
    return context;
};
