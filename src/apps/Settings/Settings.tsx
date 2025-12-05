import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Monitor, Volume2, VolumeX, Eye, EyeOff, Cpu, HardDrive } from 'lucide-react';

export const SettingsApp: React.FC = () => {
    const {
        theme, setTheme,
        soundEnabled, toggleSound,
        scanlinesEnabled, toggleScanlines,
        bootSkipped, setBootSkipped
    } = useSettings();

    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono text-neon-cyan">
            <h1 className="text-xl font-bold font-cyber mb-6 flex items-center gap-3">
                <SettingsIcon /> SYSTEM_CONFIG
            </h1>

            <div className="space-y-6">
                {/* Appearance Section */}
                <section className="bg-cyber-surface border border-neon-cyan/20 rounded-lg p-4">
                    <h2 className="text-sm text-neon-magenta mb-4 flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Monitor size={16} /> Visual Interface
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                            <div>
                                <div className="text-sm font-bold group-hover:text-neon-cyan transition-colors">Theme Engine</div>
                                <div className="text-xs text-neon-cyan/50">Select system color scheme</div>
                            </div>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as any)}
                                className="bg-cyber-bg border border-neon-cyan/30 text-neon-cyan text-sm px-3 py-1.5 rounded outline-none focus:border-neon-cyan transition-colors"
                            >
                                <option value="cyberpunk">Cyberpunk Neon</option>
                                <option value="matrix">Matrix Green</option>
                                <option value="synthwave">Synthwave</option>
                            </select>
                        </div>

                        <div className="h-px bg-neon-cyan/10" />

                        <div className="flex items-center justify-between group">
                            <div>
                                <div className="text-sm font-bold group-hover:text-neon-cyan transition-colors">CRT Scanlines</div>
                                <div className="text-xs text-neon-cyan/50">Retro display simulation</div>
                            </div>
                            <button
                                onClick={toggleScanlines}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded border transition-all
                                    ${scanlinesEnabled
                                        ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan'
                                        : 'bg-transparent border-neon-cyan/30 text-neon-cyan/50 hover:border-neon-cyan/50'
                                    }
                                `}
                            >
                                {scanlinesEnabled ? <Eye size={14} /> : <EyeOff size={14} />}
                                <span className="text-xs font-bold">{scanlinesEnabled ? 'ENABLED' : 'DISABLED'}</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* System Section */}
                <section className="bg-cyber-surface border border-neon-cyan/20 rounded-lg p-4">
                    <h2 className="text-sm text-neon-magenta mb-4 flex items-center gap-2 font-bold uppercase tracking-wider">
                        <Cpu size={16} /> System Core
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                            <div>
                                <div className="text-sm font-bold group-hover:text-neon-cyan transition-colors">Audio Feedback</div>
                                <div className="text-xs text-neon-cyan/50">Interface sound effects</div>
                            </div>
                            <button
                                onClick={toggleSound}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded border transition-all
                                    ${soundEnabled
                                        ? 'bg-neon-green/10 border-neon-green text-neon-green'
                                        : 'bg-transparent border-neon-cyan/30 text-neon-cyan/50 hover:border-neon-cyan/50'
                                    }
                                `}
                            >
                                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                <span className="text-xs font-bold">{soundEnabled ? 'ACTIVE' : 'MUTED'}</span>
                            </button>
                        </div>

                        <div className="h-px bg-neon-cyan/10" />

                        <div className="flex items-center justify-between group">
                            <div>
                                <div className="text-sm font-bold group-hover:text-neon-cyan transition-colors">Fast Boot</div>
                                <div className="text-xs text-neon-cyan/50">Skip initialization sequence</div>
                            </div>
                            <button
                                onClick={() => setBootSkipped(!bootSkipped)}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded border transition-all
                                    ${bootSkipped
                                        ? 'bg-neon-magenta/10 border-neon-magenta text-neon-magenta'
                                        : 'bg-transparent border-neon-cyan/30 text-neon-cyan/50 hover:border-neon-cyan/50'
                                    }
                                `}
                            >
                                <HardDrive size={14} />
                                <span className="text-xs font-bold">{bootSkipped ? 'SKIPPED' : 'NORMAL'}</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Info Footer */}
                <div className="text-center text-[10px] text-neon-cyan/30 pt-4">
                    HOKEI_OS CONFIGURATION UTILITY v2.1
                    <br />
                    ALL CHANGES PERSISTED TO LOCAL STORAGE
                </div>
            </div>
        </div>
    );
};

const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
