import React, { useState, useEffect, useRef } from 'react';

const COMMANDS: Record<string, string | (() => string)> = {
    help: `Available commands:
  help     - Show this help message
  about    - Learn about Ho Kei Ching
  skills   - List technical skills
  projects - Show project highlights
  contact  - Display contact information
  clear    - Clear terminal
  neofetch - Display system info
  whoami   - Who am I?`,

    about: `
╔══════════════════════════════════════════════════════╗
║                   HO KEI CHING                       ║
║              Software Engineer & Developer           ║
╠══════════════════════════════════════════════════════╣
║  Currently studying Computer Science & Business      ║
║  Administration at NUS (Double Degree Program)       ║
║                                                      ║
║  NUS Merit Scholarship Recipient                     ║
║                                                      ║
║  Passionate about building full-stack applications, ║
║  AI/ML systems, and creating delightful UX          ║
╚══════════════════════════════════════════════════════╝`,

    skills: `
[LANGUAGES]   TypeScript, JavaScript, Python, C++, SQL
[FRONTEND]    React, Svelte, React Native, TailwindCSS
[BACKEND]     Supabase, PostgreSQL, Cloudflare Workers
[AI/ML]       LangChain, RAG, LLM Integration
[TOOLS]       Docker, Git, REST APIs, n8n`,

    projects: `
> MineCode: Distributed AI Game Agent
  Tech: Docker, GCP, REST APIs, n8n
  
> RegTok: Self-Evolving Legal Compliance System  
  Tech: Python, LangChain, ChromaDB, RAG

> HealthHack Mobile App
  Tech: React Native, AWS IoT`,

    contact: `
╭──────────────────────────────────────╮
│  📧 hokeiching.work@gmail.com        │
│  📱 (+65) 9680 9818                  │
│  🔗 github.com/hokeiiiching          │
│  🔗 linkedin.com/in/ho-kei-ching     │
╰──────────────────────────────────────╯`,

    whoami: 'hokei@portfolio',

    neofetch: () => `
                    hokei@portfolio
 ██╗  ██╗██╗  ██╗   ──────────────────
 ██║  ██║██║ ██╔╝   OS: HOKEI_OS v1.0
 ███████║█████╔╝    Host: Portfolio Website
 ██╔══██║██╔═██╗    Kernel: React 19.2.0
 ██║  ██║██║  ██╗   Shell: TypeScript
 ╚═╝  ╚═╝╚═╝  ╚═╝   DE: Cyberpunk Theme
                    Terminal: Web Console
                    CPU: JavaScript V8
                    Memory: Browser RAM
                    Uptime: ${Math.floor(Math.random() * 100)}d ${Math.floor(Math.random() * 24)}h`,
};

export const TerminalApp: React.FC = () => {
    const [history, setHistory] = useState<Array<{ input: string; output: string }>>([
        { input: '', output: 'HOKEI_OS Terminal v1.0.0\nType "help" for available commands.\n' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let output = '';

        if (trimmed === 'clear') {
            setHistory([]);
            return;
        }

        if (trimmed in COMMANDS) {
            const result = COMMANDS[trimmed];
            output = typeof result === 'function' ? result() : result;
        } else if (trimmed === '') {
            output = '';
        } else {
            output = `Command not found: ${trimmed}\nType "help" for available commands.`;
        }

        setHistory(prev => [...prev, { input: cmd, output }]);
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
                            <span className="text-neon-magenta">~</span>
                            <span className="text-white">$</span>
                            <span className="text-neon-cyan">{item.input}</span>
                        </div>
                    )}
                    {item.output && (
                        <pre className="text-neon-cyan/80 whitespace-pre-wrap mt-1">{item.output}</pre>
                    )}
                </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 text-neon-cyan">
                <span className="text-neon-green">hokei@portfolio</span>
                <span className="text-neon-magenta">~</span>
                <span className="text-white">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-neon-cyan caret-neon-cyan"
                    autoFocus
                    spellCheck={false}
                />
            </form>
        </div>
    );
};
