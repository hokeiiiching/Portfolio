// src/hooks/useSound.ts

// Singleton AudioContext for all sound effects
let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isInitialized = false;
let isMuted = false;

const initAudioContext = () => {
    if (isInitialized && audioContext) return true;

    try {
        audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.gain.value = 0.15; // Slightly louder default
        masterGain.connect(audioContext.destination);
        isInitialized = true;

        // Resume if suspended (browser autoplay policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        return true;
    } catch (e) {
        console.warn('Web Audio API not supported:', e);
        return false;
    }
};

// Initialize on first user interaction
if (typeof window !== 'undefined') {
    const initOnInteraction = () => {
        initAudioContext();
        window.removeEventListener('click', initOnInteraction);
        window.removeEventListener('touchstart', initOnInteraction);
        window.removeEventListener('keydown', initOnInteraction);
    };

    window.addEventListener('click', initOnInteraction, { passive: true });
    window.addEventListener('touchstart', initOnInteraction, { passive: true });
    window.addEventListener('keydown', initOnInteraction, { passive: true });
}

type SoundType = 'hover' | 'click' | 'close' | 'type' | 'error' | 'success' | 'boot' | 'notification';

export const useSound = () => {
    const playSound = (type: SoundType) => {
        // All sounds disabled per user request
        // reference `type` as a no-op so TS doesn't complain about unused parameter
        void type;
        return;
    };

    const toggleMute = () => {
        isMuted = !isMuted;
        return isMuted;
    };

    const setVolume = (volume: number) => {
        if (masterGain) {
            masterGain.gain.value = Math.max(0, Math.min(1, volume));
        }
    };

    return { playSound, toggleMute, setVolume, isMuted: () => isMuted };
};
