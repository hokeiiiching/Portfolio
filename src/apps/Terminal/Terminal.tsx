import React, { useState, useRef, useEffect } from 'react';
// import { Terminal as TerminalIcon } from 'lucide-react'; // Unused

interface Command {
    command: string;
    output: React.ReactNode;
    path: string;
}

interface FileSystem {
    [key: string]: {
        type: 'file' | 'dir';
        content?: string;
        children?: FileSystem;
    };
}

const INITIAL_FS: FileSystem = {
    'home': {
        type: 'dir',
        children: {
            'user': {
                type: 'dir',
                children: {
                    'projects': {
                        type: 'dir',
                        children: {
                            'portfolio.txt': { type: 'file', content: 'My awesome cyberpunk portfolio built with React.' },
                            'ai-chat.js': { type: 'file', content: 'console.log("Hello AI");' }
                        }
                    },
                    'documents': {
                        type: 'dir',
                        children: {
                            'resume.md': { type: 'file', content: '# Hokei\n\nFull Stack Developer...' },
                            'secrets.txt': { type: 'file', content: 'Konami Code: Up Up Down Down Left Right Left Right B A' }
                        }
                    },
                    'welcome.txt': { type: 'file', content: 'Welcome to HOKEI_OS v2.0! Type "help" to get started.' }
                }
            }
        }
    }
};

const NEOFETCH_ART = `
    ██╗  ██╗ ██████╗ ██╗  ██╗███████╗██╗
    ██║  ██║██╔═══██╗██║ ██╔╝██╔════╝██║
    ███████║██║   ██║█████╔╝ █████╗  ██║
    ██╔══██║██║   ██║██╔═██╗ ██╔══╝  ██║
    ██║  ██║╚██████╔╝██║  ██╗███████╗██║
    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝
`;

export const TerminalApp: React.FC = () => {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState('');
    const [currentPath, setCurrentPath] = useState<string[]>(['home', 'user']);
    const [fs, setFs] = useState<FileSystem>(INITIAL_FS);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on click
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Run neofetch on startup
    useEffect(() => {
        if (history.length === 0) {
            handleCommand('neofetch');
        }
    }, []);

    const resolvePath = (pathStr: string): { target: any, newPath: string[] } | null => {
        const parts = pathStr.split('/').filter(p => p);
        // let current = fs; // Unused
        let traversalPath = [...currentPath];

        if (pathStr.startsWith('/')) {
            traversalPath = [];
        }

        // Navigate to start
        let node: any = fs;
        for (const p of traversalPath) {
            node = node[p]?.children;
        }

        // Traverse
        for (const part of parts) {
            if (part === '.') continue;
            if (part === '..') {
                if (traversalPath.length > 0) traversalPath.pop();
                // Reset node to root and traverse again (inefficient but simple for this depth)
                node = fs;
                for (const p of traversalPath) {
                    node = node[p]?.children;
                }
            } else {
                if (node && node[part] && node[part].type === 'dir') {
                    node = node[part].children;
                    traversalPath.push(part);
                } else {
                    return null;
                }
            }
        }
        return { target: node, newPath: traversalPath };
    };

    const getFileContent = (fileName: string) => {
        let node: any = fs;
        for (const p of currentPath) {
            node = node[p]?.children;
        }
        return node[fileName]?.type === 'file' ? node[fileName].content : null;
    };

    const handleCommand = (cmd: string) => {
        const [command, ...args] = cmd.trim().split(' ');
        let output: React.ReactNode = '';

        switch (command.toLowerCase()) {
            case 'help':
                output = (
                    <div className="space-y-1 text-neon-cyan/80">
                        <div>Available commands:</div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-neon-cyan">neofetch</span><span>Display system information</span>
                            <span className="text-neon-cyan">ls</span><span>List directory contents</span>
                            <span className="text-neon-cyan">cd</span><span>Change directory</span>
                            <span className="text-neon-cyan">pwd</span><span>Print working directory</span>
                            <span className="text-neon-cyan">cat</span><span>Read file content</span>
                            <span className="text-neon-cyan">mkdir</span><span>Create directory</span>
                            <span className="text-neon-cyan">touch</span><span>Create file</span>
                            <span className="text-neon-cyan">rm</span><span>Remove file or directory</span>
                            <span className="text-neon-cyan">clear</span><span>Clear terminal history</span>
                            <span className="text-neon-cyan">whoami</span><span>Display current user</span>
                            <span className="text-neon-cyan">date</span><span>Display current date/time</span>
                        </div>
                    </div>
                );
                break;
            case 'neofetch':
                output = (
                    <div className="flex gap-6 text-sm font-mono my-2">
                        <div className="text-neon-cyan font-bold whitespace-pre leading-tight select-none">
                            {NEOFETCH_ART}
                        </div>
                        <div className="space-y-1">
                            <div className="font-bold text-neon-cyan mb-2">user@hokei_os</div>
                            <div className="grid grid-cols-[100px_1fr] gap-x-2">
                                <span className="text-neon-cyan font-bold">OS</span><span>HOKEI_OS v2.0 (Cyberpunk)</span>
                                <span className="text-neon-cyan font-bold">Host</span><span>React Portfolio Engine</span>
                                <span className="text-neon-cyan font-bold">Kernel</span><span>Web Browser 128.0</span>
                                <span className="text-neon-cyan font-bold">Uptime</span><span>{Math.floor(performance.now() / 60000)} mins</span>
                                <span className="text-neon-cyan font-bold">Packages</span><span>25 (npm)</span>
                                <span className="text-neon-cyan font-bold">Shell</span><span>zsh 5.9</span>
                                <span className="text-neon-cyan font-bold">Resolution</span><span>{window.innerWidth}x{window.innerHeight}</span>
                                <span className="text-neon-cyan font-bold">Theme</span><span>Neon Night [GTK2/3]</span>
                                <span className="text-neon-cyan font-bold">Icons</span><span>Lucide React</span>
                                <span className="text-neon-cyan font-bold">Terminal</span><span>HokeiTerm</span>
                                <span className="text-neon-cyan font-bold">CPU</span><span>Virtual Core i9</span>
                                <span className="text-neon-cyan font-bold">GPU</span><span>WebGL Renderer</span>
                                <span className="text-neon-cyan font-bold">Memory</span><span>128MB / 4GB</span>
                            </div>
                            <div className="flex gap-1 mt-3">
                                <div className="w-4 h-4 bg-black"></div>
                                <div className="w-4 h-4 bg-red-500"></div>
                                <div className="w-4 h-4 bg-green-500"></div>
                                <div className="w-4 h-4 bg-yellow-500"></div>
                                <div className="w-4 h-4 bg-blue-500"></div>
                                <div className="w-4 h-4 bg-purple-500"></div>
                                <div className="w-4 h-4 bg-cyan-500"></div>
                                <div className="w-4 h-4 bg-white"></div>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'ls':
                let node: any = fs;
                for (const p of currentPath) {
                    node = node[p]?.children;
                }
                if (node) {
                    output = (
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(node).map(([name, data]: [string, any]) => (
                                <span key={name} className={data.type === 'dir' ? 'text-neon-blue font-bold' : 'text-neon-cyan'}>
                                    {name}{data.type === 'dir' ? '/' : ''}
                                </span>
                            ))}
                        </div>
                    );
                }
                break;
            case 'cd':
                const path = args[0];
                if (!path) {
                    setCurrentPath(['home', 'user']);
                } else {
                    const result = resolvePath(path);
                    if (result) {
                        setCurrentPath(result.newPath);
                    } else {
                        output = <span className="text-neon-pink">cd: no such file or directory: {path}</span>;
                    }
                }
                break;
            case 'pwd':
                output = '/' + currentPath.join('/');
                break;
            case 'mkdir':
                const dirName = args[0];
                if (dirName) {
                    setFs(prev => {
                        const newFs = JSON.parse(JSON.stringify(prev));
                        let node = newFs;
                        for (const p of currentPath) {
                            node = node[p].children;
                        }
                        if (node[dirName]) {
                            output = <span className="text-neon-pink">mkdir: cannot create directory '{dirName}': File exists</span>;
                            return prev;
                        }
                        node[dirName] = { type: 'dir', children: {} };
                        return newFs;
                    });
                } else {
                    output = <span className="text-neon-pink">mkdir: missing operand</span>;
                }
                break;
            case 'touch':
                const fileName = args[0];
                if (fileName) {
                    setFs(prev => {
                        const newFs = JSON.parse(JSON.stringify(prev));
                        let node = newFs;
                        for (const p of currentPath) {
                            node = node[p].children;
                        }
                        if (!node[fileName]) {
                            node[fileName] = { type: 'file', content: '' };
                        }
                        return newFs;
                    });
                } else {
                    output = <span className="text-neon-pink">touch: missing operand</span>;
                }
                break;
            case 'rm':
                const target = args[0];
                if (target) {
                    setFs(prev => {
                        const newFs = JSON.parse(JSON.stringify(prev));
                        let node = newFs;
                        for (const p of currentPath) {
                            node = node[p].children;
                        }
                        if (node[target]) {
                            delete node[target];
                        } else {
                            output = <span className="text-neon-pink">rm: cannot remove '{target}': No such file or directory</span>;
                            return prev;
                        }
                        return newFs;
                    });
                } else {
                    output = <span className="text-neon-pink">rm: missing operand</span>;
                }
                break;
            case 'cat':
                const file = args[0];
                const content = getFileContent(file);
                if (content !== null && content !== undefined) {
                    output = <div className="whitespace-pre-wrap text-neon-cyan/90">{content}</div>;
                } else {
                    output = <span className="text-neon-pink">cat: {file}: No such file</span>;
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                output = 'user';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case '':
                break;
            default:
                output = <span className="text-neon-pink">Command not found: {command}. Type 'help' for available commands.</span>;
        }

        setHistory(prev => [...prev, { command: cmd, output, path: '/' + currentPath.join('/') }]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    return (
        <div
            className="h-full flex flex-col font-mono text-sm bg-gradient-to-br from-cyber-dark/80 via-cyber-bg/90 to-cyber-dark/80 backdrop-blur-md text-neon-cyan"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-3">
                {history.map((item, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex gap-2 items-center">
                            <span className="text-neon-green font-semibold">user@hokei_os</span>
                            <span className="text-neon-cyan/50">:</span>
                            <span className="text-neon-blue">{item.path}</span>
                            <span className="text-neon-magenta">$</span>
                            <span className="text-neon-cyan">{item.command}</span>
                        </div>
                        {item.output && <div className="pl-4 mt-1 text-neon-cyan/80">{item.output}</div>}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 p-4 pt-2 border-t border-neon-cyan/10 bg-cyber-dark/30">
                <span className="text-neon-green font-semibold">user@hokei_os</span>
                <span className="text-neon-cyan/50">:</span>
                <span className="text-neon-blue">{'/' + currentPath.join('/')}</span>
                <span className="text-neon-magenta">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none text-neon-cyan caret-neon-cyan placeholder-neon-cyan/30"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};
