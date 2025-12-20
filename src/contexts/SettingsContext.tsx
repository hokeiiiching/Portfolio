import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsState {
    theme: 'modern' | 'cyberpunk' | 'matrix' | 'synthwave';
    soundEnabled: boolean;
    scanlinesEnabled: boolean;
    wallpaperIndex: number;
    bootSkipped: boolean;
}

interface SettingsContextType extends SettingsState {
    setTheme: (theme: SettingsState['theme']) => void;
    toggleSound: () => void;
    toggleScanlines: () => void;
    setWallpaperIndex: (index: number) => void;
    setBootSkipped: (skipped: boolean) => void;
}

const DEFAULT_SETTINGS: SettingsState = {
    theme: 'modern',
    soundEnabled: true,
    scanlinesEnabled: true,
    wallpaperIndex: 0,
    bootSkipped: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<SettingsState>(() => {
        const saved = localStorage.getItem('hokei_os_settings');
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('hokei_os_settings', JSON.stringify(settings));

        // Apply theme to document body
        document.body.className = settings.theme;

        // Apply scanlines class
        if (settings.scanlinesEnabled) {
            document.body.classList.add('scanlines-active');
        } else {
            document.body.classList.remove('scanlines-active');
        }
    }, [settings]);

    const setTheme = (theme: SettingsState['theme']) => setSettings(prev => ({ ...prev, theme }));
    const toggleSound = () => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    const toggleScanlines = () => setSettings(prev => ({ ...prev, scanlinesEnabled: !prev.scanlinesEnabled }));
    const setWallpaperIndex = (index: number) => setSettings(prev => ({ ...prev, wallpaperIndex: index }));
    const setBootSkipped = (bootSkipped: boolean) => setSettings(prev => ({ ...prev, bootSkipped }));

    return (
        <SettingsContext.Provider value={{
            ...settings,
            setTheme,
            toggleSound,
            toggleScanlines,
            setWallpaperIndex,
            setBootSkipped
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
