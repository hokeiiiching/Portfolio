import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

export const useKonamiCode = (onUnlock: () => void) => {
    const inputRef = useRef<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newItem = e.key;

            const currentInput = [...inputRef.current, newItem];

            // Keep only the last N keys
            if (currentInput.length > KONAMI_CODE.length) {
                currentInput.shift();
            }

            inputRef.current = currentInput;

            // Check if matches
            if (JSON.stringify(currentInput) === JSON.stringify(KONAMI_CODE)) {
                onUnlock();
                inputRef.current = []; // Reset
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onUnlock]);
};
