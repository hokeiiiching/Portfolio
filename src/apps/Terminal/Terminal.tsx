import React, { useState, useEffect, useRef } from 'react';

// --- Types ---
type FileSystemItem = {
    type: 'file' | 'directory';
    content?: string;
    children?: Record<string, FileSystemItem>;
};

type FileSystem = Record<string, FileSystemItem>;

// --- Initial State ---
const INITIAL_FS: FileSystem = {
    'home': {
        type: 'directory',
        children: {
            'hokei': {
                type: 'directory',
                children: {
                    'projects': {
                        type: 'directory',
                        children: {
                            'minecode.txt': { type: 'file', content: 'MineCode: Distributed AI agent for Minecraft...' },
                            'regtok.txt': { type: 'file', content: 'RegTok: AI-powered legal compliance system...' },
                        }
                    },
                    'skills': {
                        type: 'directory',
                        children: {
                            'frontend.txt': { type: 'file', content: 'React, TypeScript, TailwindCSS, Svelte' },
                            'backend.txt': { type: 'file', content: 'Node.js, Python, PostgreSQL, Docker' },
                        }
                    },
                    'about.txt': { type: 'file', content: 'Ho Kei Ching\nSoftware Engineer & Developer\nNUS Computer Science & Business Admin' },
                    'contact.txt': { type: 'file', content: 'Email: hokeiching.work@gmail.com\nLinkedIn: linkedin.com/in/ho-kei-ching' },
                    'secret.txt': { type: 'file', content: '🔐 You found the secret! There is no spoon.' },
                }
            }
        }
    }
};

// --- Helper Functions ---
const resolvePath = (fs: FileSystem, currentPath: string[], targetPath: string): { item: FileSystemItem | null, parent: FileSystemItem | null, name: string } => {
    const parts = targetPath.split('/').filter(p => p);
    let pathStack = targetPath.startsWith('/') ? [] : [...currentPath];

    // Handle '..' and '.'
    const finalParts: string[] = [];
    for (const part of [...pathStack, ...parts]) {
        if (part === '..') {
            finalParts.pop();
        } else if (part !== '.') {
            finalParts.push(part);
        }
    }

    let current: FileSystemItem = { type: 'directory', children: fs };
    let parent: FileSystemItem | null = null;
    let name = '';

    for (let i = 0; i < finalParts.length; i++) {
        const part = finalParts[i];
        if (current.type !== 'directory' || !current.children || !current.children[part]) {
            return { item: null, parent: null, name: part };
        }
        parent = current;
        current = current.children[part];
        name = part;
    }

    return { item: current, parent, name };
};

const formatPath = (path: string[]) => {
    if (path.length === 0) return '/';
    const pathStr = '/' + path.join('/');
    if (pathStr.startsWith('/home/hokei')) {
        return '~' + pathStr.slice(11);
    }
    return pathStr;
};

export const TerminalApp: React.FC = () => {
    const [history, setHistory] = useState<Array<{ input: string; output: string }>>([
        { input: '', output: 'HOKEI_OS Terminal v2.1.0\nType "help" for available commands.\n' }
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Filesystem State
    const [fs, setFs] = useState<FileSystem>(INITIAL_FS);
    const [currentPath, setCurrentPath] = useState<string[]>(['home', 'hokei']);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [history]);

    const executeCommand = (cmd: string, args: string[]): string => {
        switch (cmd) {
            case 'help':
                return `
Available Commands:
  ls [dir]      List directory contents
  cd [dir]      Change directory
  pwd           Print working directory
  mkdir [dir]   Create directory
  touch [file]  Create empty file
  cat [file]    Read file content
  rm [file]     Remove file or directory
  clear         Clear terminal
  echo [text]   Print text
  whoami        Display user
  date          Display date
  help          Show this help`;

            case 'ls': {
                const target = args[0] || '.';
                const { item } = resolvePath(fs, currentPath, target);

                if (!item) return `ls: cannot access '${target}': No such file or directory`;
                if (item.type === 'file') return target;

                if (item.children) {
                    return Object.entries(item.children).map(([name, child]) => {
                        const isDir = child.type === 'directory';
                        return isDir ? `\x1b[1;34m${name}/\x1b[0m` : name;
                    }).join('  ');
                }
                return '';
            }

            case 'cd': {
                const target = args[0] || '~';
                const targetPath = target === '~' ? '/home/hokei' : target;
                const { item } = resolvePath(fs, currentPath, targetPath);

                if (!item) return `cd: ${target}: No such file or directory`;
                if (item.type !== 'directory') return `cd: ${target}: Not a directory`;

                // Re-calculate absolute path for state
                // This is a simplified approach; a robust one would track the absolute path stack
                // For now, let's just resolve the path string to an array
                // A better way is to actually traverse and build the new path array
                // But since resolvePath logic is stateless regarding the path array, we need to replicate it

                const parts = targetPath.split('/').filter(p => p);
                let newPath = targetPath.startsWith('/') ? [] : [...currentPath];
                for (const part of parts) {
                    if (part === '..') newPath.pop();
                    else if (part !== '.') newPath.push(part);
                }
                setCurrentPath(newPath);
                return '';
            }

            case 'pwd':
                return '/' + currentPath.join('/');

            case 'mkdir': {
                if (!args[0]) return 'mkdir: missing operand';
                const name = args[0];
                const { item: parent } = resolvePath(fs, currentPath, '.');

                if (parent && parent.children) {
                    if (parent.children[name]) return `mkdir: cannot create directory '${name}': File exists`;

                    // Immutable update
                    const newFs = JSON.parse(JSON.stringify(fs));
                    let current = newFs;
                    for (const part of currentPath) {
                        current = current[part].children;
                    }
                    current[name] = { type: 'directory', children: {} };
                    setFs(newFs);
                    return '';
                }
                return 'mkdir: error creating directory';
            }

            case 'touch': {
                if (!args[0]) return 'touch: missing operand';
                const name = args[0];
                const { item: parent } = resolvePath(fs, currentPath, '.');

                if (parent && parent.children) {
                    if (parent.children[name]) return ''; // Update timestamp in real OS, do nothing here

                    const newFs = JSON.parse(JSON.stringify(fs));
                    let current = newFs;
                    for (const part of currentPath) {
                        current = current[part].children;
                    }
                    current[name] = { type: 'file', content: '' };
                    setFs(newFs);
                    return '';
                }
                return 'touch: error creating file';
            }

            case 'rm': {
                if (!args[0]) return 'rm: missing operand';
                const name = args[0];
                const { item: parent } = resolvePath(fs, currentPath, '.');

                if (parent && parent.children) {
                    if (!parent.children[name]) return `rm: cannot remove '${name}': No such file or directory`;

                    const newFs = JSON.parse(JSON.stringify(fs));
                    let current = newFs;
                    for (const part of currentPath) {
                        current = current[part].children;
                    }
                    delete current[name];
                    setFs(newFs);
                    return '';
                }
                return 'rm: error removing file';
            }

            case 'cat': {
                if (!args[0]) return 'cat: missing operand';
                const { item } = resolvePath(fs, currentPath, args[0]);

                if (!item) return `cat: ${args[0]}: No such file or directory`;
                if (item.type === 'directory') return `cat: ${args[0]}: Is a directory`;
                return item.content || '';
            }

            case 'whoami': return 'hokei';
            case 'date': return new Date().toLocaleString();
            case 'echo': return args.join(' ');

            default:
                return `Command not found: ${cmd}`;
        }
    };

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        const [command, ...args] = trimmed.split(' ');

        // Add to history
        setCommandHistory(prev => [...prev.filter(c => c !== trimmed), trimmed]);
        setHistoryIndex(-1);

        if (command.toLowerCase() === 'clear') {
            setHistory([]);
            return;
        }

        const output = executeCommand(command.toLowerCase(), args);
        setHistory(prev => [...prev, { input: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Tab completion logic
            const [cmd, ...args] = input.split(' ');
            if (args.length === 0) {
                // Complete command
                const cmds = ['help', 'ls', 'cd', 'pwd', 'mkdir', 'touch', 'cat', 'rm', 'clear', 'echo', 'whoami', 'date'];
                const matches = cmds.filter(c => c.startsWith(cmd));
                if (matches.length === 1) setInput(matches[0]);
            } else {
                // Complete file/dir
                const partial = args[args.length - 1];
                const { item } = resolvePath(fs, currentPath, '.');
                if (item && item.children) {
                    const matches = Object.keys(item.children).filter(name => name.startsWith(partial));
                    if (matches.length === 1) {
                        const newInput = [...input.split(' ').slice(0, -1), matches[0]].join(' ');
                        setInput(newInput);
                    }
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput('');
    };

    return (
        <div
            ref={containerRef}
            className="h-full bg-cyber-bg p-4 font-mono text-sm overflow-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
        >
            {/* History */}
            {history.map((item, i) => (
                <div key={i} className="mb-2">
                    {item.input && (
                        <div className="flex items-center gap-2 text-neon-cyan">
                            <span className="text-neon-green">hokei@portfolio</span>
                            <span className="text-neon-magenta">{formatPath(currentPath)}</span>
                            <span className="text-white">$</span>
                            <span className="text-neon-cyan">{item.input}</span>
                        </div>
                    )}
                    {item.output && (
                        <pre className="text-neon-cyan/80 whitespace-pre-wrap mt-1 font-mono">
                            {item.output.split('  ').map((part, idx) => (
                                <span key={idx} dangerouslySetInnerHTML={{
                                    __html: part.replace(/\x1b\[1;34m(.*?)\x1b\[0m/g, '<span class="text-neon-blue font-bold">$1</span>')
                                }} />
                            )).reduce((prev, curr) => [prev, '  ', curr] as any)}
                        </pre>
                    )}
                </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 text-neon-cyan">
                <span className="text-neon-green">hokei@portfolio</span>
                <span className="text-neon-magenta">{formatPath(currentPath)}</span>
                <span className="text-white">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-neon-cyan caret-neon-cyan"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
