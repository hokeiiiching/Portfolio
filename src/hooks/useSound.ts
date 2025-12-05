import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'open' | 'close' | 'type' | 'error' | 'success' | 'boot';

export const useSound = () => {
    const audioContext = useRef<AudioContext | null>(null);
    const masterGain = useRef<GainNode | null>(null);
    const isMuted = useRef(false);

    useEffect(() => {
        // Initialize AudioContext on first user interaction to comply with browser policies
        const initAudio = () => {
            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                masterGain.current = audioContext.current.createGain();
                masterGain.current.gain.value = 0.1; // Low volume by default
                masterGain.current.connect(audioContext.current.destination);
            }
            if (audioContext.current.state === 'suspended') {
                audioContext.current.resume();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });

        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const playSound = useCallback((type: SoundType) => {
        if (isMuted.current || !audioContext.current || !masterGain.current) return;

        const ctx = audioContext.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(masterGain.current);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                // High pitched short blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'click':
                // Mechanical click
                osc.type = 'square';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'open':
                // Power up sound
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'close':
                // Power down sound
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'type':
                // Soft click
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(800, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
                break;

            case 'error':
                // Buzzer
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.2);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;

            case 'success':
                // Chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(554, now + 0.1); // C#
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
        }
    }, []);

    const toggleMute = useCallback(() => {
        isMuted.current = !isMuted.current;
        return isMuted.current;
    }, []);

    return { playSound, toggleMute };
};
