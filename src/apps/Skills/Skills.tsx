import React, { useState } from 'react';
import { Code, Database, Globe, Server, Cpu, Smartphone, Brain, Palette } from 'lucide-react';

interface Skill {
    name: string;
    level: number;
    category: string;
    icon: React.ReactNode;
    color: string;
}

const SKILLS: Skill[] = [
    // Languages
    { name: 'TypeScript', level: 90, category: 'Languages', icon: <Code size={16} />, color: 'cyan' },
    { name: 'Python', level: 85, category: 'Languages', icon: <Code size={16} />, color: 'cyan' },
    { name: 'JavaScript', level: 90, category: 'Languages', icon: <Code size={16} />, color: 'cyan' },
    { name: 'C++', level: 70, category: 'Languages', icon: <Code size={16} />, color: 'cyan' },
    { name: 'SQL', level: 75, category: 'Languages', icon: <Database size={16} />, color: 'cyan' },

    // Frontend
    { name: 'React', level: 90, category: 'Frontend', icon: <Globe size={16} />, color: 'magenta' },
    { name: 'Svelte', level: 85, category: 'Frontend', icon: <Globe size={16} />, color: 'magenta' },
    { name: 'TailwindCSS', level: 90, category: 'Frontend', icon: <Palette size={16} />, color: 'magenta' },
    { name: 'React Native', level: 75, category: 'Frontend', icon: <Smartphone size={16} />, color: 'magenta' },

    // Backend
    { name: 'Supabase', level: 80, category: 'Backend', icon: <Server size={16} />, color: 'green' },
    { name: 'PostgreSQL', level: 75, category: 'Backend', icon: <Database size={16} />, color: 'green' },
    { name: 'Docker', level: 70, category: 'Backend', icon: <Server size={16} />, color: 'green' },
    { name: 'REST APIs', level: 85, category: 'Backend', icon: <Globe size={16} />, color: 'green' },

    // AI/ML
    { name: 'LangChain', level: 80, category: 'AI/ML', icon: <Brain size={16} />, color: 'pink' },
    { name: 'RAG Systems', level: 75, category: 'AI/ML', icon: <Brain size={16} />, color: 'pink' },
    { name: 'LLM Integration', level: 80, category: 'AI/ML', icon: <Cpu size={16} />, color: 'pink' },
];

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'AI/ML'];

export const SkillsApp: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const filteredSkills = activeCategory === 'all'
        ? SKILLS
        : SKILLS.filter(s => s.category === activeCategory);

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; bar: string }> = {
            cyan: { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan', bar: 'bg-neon-cyan' },
            magenta: { bg: 'bg-neon-magenta/20', text: 'text-neon-magenta', bar: 'bg-neon-magenta' },
            green: { bg: 'bg-neon-green/20', text: 'text-neon-green', bar: 'bg-neon-green' },
            pink: { bg: 'bg-neon-pink/20', text: 'text-neon-pink', bar: 'bg-neon-pink' },
        };
        return colors[color] || colors.cyan;
    };

    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-neon-cyan font-cyber mb-2">
                    SKILLS.DATABASE
                </h1>
                <p className="text-sm text-neon-cyan/50">
                    Technical proficiency matrix // {SKILLS.length} skills indexed
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1 text-xs rounded border transition-all ${activeCategory === 'all'
                            ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                            : 'border-neon-cyan/30 text-neon-cyan/50 hover:text-neon-cyan'
                        }`}
                >
                    ALL
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1 text-xs rounded border transition-all ${activeCategory === cat
                                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                                : 'border-neon-cyan/30 text-neon-cyan/50 hover:text-neon-cyan'
                            }`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <div className="space-y-3">
                {filteredSkills.map(skill => {
                    const colorClasses = getColorClasses(skill.color);
                    const isHovered = hoveredSkill === skill.name;

                    return (
                        <div
                            key={skill.name}
                            className={`
                                bg-cyber-surface border border-neon-cyan/10 rounded-lg p-4
                                transition-all duration-200 cursor-default
                                ${isHovered ? 'border-neon-cyan/40 shadow-neon-cyan' : ''}
                            `}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={colorClasses.text}>{skill.icon}</span>
                                    <span className={`text-sm font-medium ${colorClasses.text}`}>
                                        {skill.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-neon-cyan/40">{skill.category}</span>
                                    <span className={`text-sm font-bold ${colorClasses.text}`}>
                                        {skill.level}%
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${colorClasses.bar} transition-all duration-500`}
                                    style={{
                                        width: isHovered ? `${skill.level}%` : `${skill.level}%`,
                                        boxShadow: isHovered ? `0 0 10px currentColor` : 'none'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 pt-4 border-t border-neon-cyan/10 grid grid-cols-4 gap-4 text-center">
                {CATEGORIES.map(cat => {
                    const catSkills = SKILLS.filter(s => s.category === cat);
                    const avgLevel = Math.round(catSkills.reduce((a, b) => a + b.level, 0) / catSkills.length);
                    return (
                        <div key={cat}>
                            <div className="text-lg font-bold text-neon-cyan">{avgLevel}%</div>
                            <div className="text-xs text-neon-cyan/50">{cat}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
