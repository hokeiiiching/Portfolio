import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, Zap } from 'lucide-react';

// Simple Snake Game
export const GamesApp: React.FC = () => {
    const [gameMode, setGameMode] = useState<'menu' | 'snake' | 'typing'>('menu');

    return (
        <div className="h-full bg-cyber-bg font-mono overflow-hidden">
            {gameMode === 'menu' && <GameMenu onSelect={setGameMode} />}
            {gameMode === 'snake' && <SnakeGame onBack={() => setGameMode('menu')} />}
            {gameMode === 'typing' && <TypingGame onBack={() => setGameMode('menu')} />}
        </div>
    );
};

const GameMenu: React.FC<{ onSelect: (mode: 'snake' | 'typing') => void }> = ({ onSelect }) => (
    <div className="h-full flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-cyber font-bold text-neon-cyan mb-2">ARCADE.EXE</h1>
        <p className="text-sm text-neon-cyan/50 mb-8">Select a game to play</p>

        <div className="grid gap-4 w-full max-w-xs">
            <button
                onClick={() => onSelect('snake')}
                className="p-6 bg-cyber-surface border border-neon-green/30 rounded-lg hover:border-neon-green hover:shadow-neon-cyan transition-all group"
            >
                <div className="text-3xl mb-2">🐍</div>
                <div className="text-lg text-neon-green font-bold">SNAKE</div>
                <div className="text-xs text-neon-cyan/50">Classic arcade game</div>
            </button>

            <button
                onClick={() => onSelect('typing')}
                className="p-6 bg-cyber-surface border border-neon-magenta/30 rounded-lg hover:border-neon-magenta hover:shadow-neon-magenta transition-all group"
            >
                <div className="text-3xl mb-2">⌨️</div>
                <div className="text-lg text-neon-magenta font-bold">TYPING TEST</div>
                <div className="text-xs text-neon-cyan/50">Test your speed</div>
            </button>
        </div>
    </div>
);

// Snake Game
const SnakeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const GRID_SIZE = 15;
    const CELL_SIZE = 20;

    const [snake, setSnake] = useState([{ x: 7, y: 7 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }, []);

    const resetGame = () => {
        setSnake([{ x: 7, y: 7 }]);
        setFood(generateFood());
        setDirection({ x: 1, y: 0 });
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
                case ' ':
                    setIsPaused(p => !p);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameOver]);

    useEffect(() => {
        if (isPaused || gameOver) return;

        const interval = setInterval(() => {
            setSnake(prev => {
                const newHead = {
                    x: (prev[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
                    y: (prev[0].y + direction.y + GRID_SIZE) % GRID_SIZE
                };

                // Check self collision
                if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
                    setGameOver(true);
                    if (score > highScore) setHighScore(score);
                    return prev;
                }

                const newSnake = [newHead, ...prev];

                // Check food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(generateFood());
                    setScore(s => s + 10);
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [direction, isPaused, gameOver, food, generateFood, score, highScore]);

    return (
        <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-between w-full max-w-xs mb-4">
                <button onClick={onBack} className="text-neon-cyan/50 hover:text-neon-cyan text-sm">
                    ← Back
                </button>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-neon-green">
                        <Zap size={14} className="inline mr-1" />
                        {score}
                    </div>
                    <div className="text-sm text-neon-yellow">
                        <Trophy size={14} className="inline mr-1" />
                        {highScore}
                    </div>
                </div>
            </div>

            <div
                className="border-2 border-neon-green/50 rounded-lg overflow-hidden bg-cyber-dark"
                style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
            >
                {/* Grid */}
                <div className="relative w-full h-full">
                    {/* Food */}
                    <div
                        className="absolute bg-neon-pink rounded-full animate-pulse"
                        style={{
                            width: CELL_SIZE - 4,
                            height: CELL_SIZE - 4,
                            left: food.x * CELL_SIZE + 2,
                            top: food.y * CELL_SIZE + 2,
                        }}
                    />

                    {/* Snake */}
                    {snake.map((seg, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-sm ${i === 0 ? 'bg-neon-cyan' : 'bg-neon-green'}`}
                            style={{
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                                left: seg.x * CELL_SIZE + 1,
                                top: seg.y * CELL_SIZE + 1,
                                opacity: 1 - (i * 0.05),
                            }}
                        />
                    ))}

                    {/* Game Over / Pause Overlay */}
                    {(gameOver || isPaused) && (
                        <div className="absolute inset-0 bg-cyber-bg/80 flex flex-col items-center justify-center">
                            <div className="text-xl font-bold text-neon-cyan mb-4">
                                {gameOver ? 'GAME OVER' : 'PAUSED'}
                            </div>
                            <button
                                onClick={resetGame}
                                className="flex items-center gap-2 px-4 py-2 bg-neon-green/20 border border-neon-green rounded text-neon-green hover:bg-neon-green/30 transition-all"
                            >
                                <RotateCcw size={16} />
                                {gameOver ? 'Play Again' : 'Start'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 text-xs text-neon-cyan/40 text-center">
                Use arrow keys to move • Space to pause
            </div>
        </div>
    );
};

// Typing Game
const TypingGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const WORDS = [
        'cyberpunk', 'neon', 'hacker', 'terminal', 'matrix', 'code', 'digital',
        'future', 'chrome', 'neural', 'synth', 'quantum', 'binary', 'protocol',
        'interface', 'algorithm', 'database', 'network', 'encryption', 'firewall'
    ];

    const [currentWord, setCurrentWord] = useState('');
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [wordsTyped, setWordsTyped] = useState(0);

    const getNewWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setWordsTyped(0);
        setTimeLeft(30);
        setInput('');
        setCurrentWord(getNewWord());
    };

    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    setIsPlaying(false);
                    setWpm(Math.round((wordsTyped / 30) * 60));
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft, wordsTyped]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value.trim().toLowerCase() === currentWord.toLowerCase()) {
            setScore(s => s + currentWord.length * 10);
            setWordsTyped(w => w + 1);
            setCurrentWord(getNewWord());
            setInput('');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6">
            <button onClick={onBack} className="absolute top-4 left-4 text-neon-cyan/50 hover:text-neon-cyan text-sm">
                ← Back
            </button>

            {!isPlaying && timeLeft === 30 ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neon-magenta mb-4">TYPING TEST</h2>
                    <p className="text-neon-cyan/50 mb-6">Type as many words as you can in 30 seconds</p>
                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-neon-magenta/20 border border-neon-magenta rounded text-neon-magenta hover:bg-neon-magenta/30 transition-all"
                    >
                        Start Typing
                    </button>
                </div>
            ) : !isPlaying ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neon-cyan mb-4">TIME'S UP!</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-cyber-surface p-4 rounded-lg">
                            <div className="text-2xl font-bold text-neon-green">{wpm}</div>
                            <div className="text-xs text-neon-cyan/50">WPM</div>
                        </div>
                        <div className="bg-cyber-surface p-4 rounded-lg">
                            <div className="text-2xl font-bold text-neon-magenta">{score}</div>
                            <div className="text-xs text-neon-cyan/50">Score</div>
                        </div>
                    </div>
                    <button
                        onClick={startGame}
                        className="px-6 py-3 bg-neon-cyan/20 border border-neon-cyan rounded text-neon-cyan hover:bg-neon-cyan/30 transition-all"
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md text-center">
                    <div className="flex justify-between mb-6">
                        <div className="text-neon-green">Score: {score}</div>
                        <div className="text-neon-yellow">Time: {timeLeft}s</div>
                    </div>

                    <div className="text-4xl font-bold text-neon-magenta mb-6 tracking-wider">
                        {currentWord}
                    </div>

                    <input
                        type="text"
                        value={input}
                        onChange={handleInput}
                        autoFocus
                        className="w-full px-4 py-3 bg-cyber-surface border border-neon-cyan/30 rounded-lg text-neon-cyan text-center text-xl outline-none focus:border-neon-cyan"
                        placeholder="Type here..."
                    />

                    <div className="mt-4 text-sm text-neon-cyan/40">
                        Words typed: {wordsTyped}
                    </div>
                </div>
            )}
        </div>
    );
};
