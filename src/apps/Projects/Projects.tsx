import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    color: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: 'MineCode',
        description: 'Distributed AI agent for Minecraft using Docker containers on GCP. Features real-time bidirectional communication and n8n workflow automation.',
        tags: ['Docker', 'GCP', 'Python', 'REST APIs', 'n8n'],
        color: 'cyan',
    },
    {
        title: 'RegTok',
        description: 'AI-powered legal compliance system with RAG pipeline using LangChain and ChromaDB. Reduced manual legal review workloads by 70%.',
        tags: ['Python', 'LangChain', 'ChromaDB', 'RAG', 'AI'],
        color: 'magenta',
    },
    {
        title: 'HealthHack App',
        description: 'Cross-platform mobile app for medication tracking with AWS IoT integration for smart pill dispensers.',
        tags: ['React Native', 'AWS IoT', 'Expo', 'Mobile'],
        color: 'green',
    },
    {
        title: 'Portfolio OS',
        description: 'This very website! A cyberpunk-themed interactive desktop portfolio built with React and TailwindCSS.',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
        color: 'pink',
        link: 'https://hokeiiiching.vercel.app',
    },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const getColorClasses = (color: string) => {
        const colors: Record<string, { border: string; text: string; bg: string }> = {
            cyan: { border: 'border-neon-cyan/30', text: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
            magenta: { border: 'border-neon-magenta/30', text: 'text-neon-magenta', bg: 'bg-neon-magenta/10' },
            green: { border: 'border-neon-green/30', text: 'text-neon-green', bg: 'bg-neon-green/10' },
            pink: { border: 'border-neon-pink/30', text: 'text-neon-pink', bg: 'bg-neon-pink/10' },
        };
        return colors[color] || colors.cyan;
    };

    const colorClasses = getColorClasses(project.color);


    return (
        <article className={`
            bg-cyber-surface border ${colorClasses.border} rounded-lg overflow-hidden
            hover:border-opacity-60 transition-all duration-200
            group cursor-default flex flex-col
        `}>
            

            <div className="p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${colorClasses.bg} ${colorClasses.text} animate-pulse`} />
                        <h3 className={`text-lg font-bold ${colorClasses.text}`}>
                            {project.title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-neon-cyan/50 hover:text-neon-cyan transition-colors"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neon-cyan/70 mb-4 leading-relaxed flex-1">
                    {">"} {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className={`
                                text-xs px-2 py-1 rounded border
                                ${colorClasses.border} ${colorClasses.text} ${colorClasses.bg}
                            `}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export const Projects: React.FC = () => {
    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-neon-cyan font-cyber">PROJECTS.DIR</h1>
                    <p className="text-sm text-neon-cyan/50">~/hokei/projects/</p>
                </div>
                <div className="text-sm text-neon-cyan/50">
                    {projects.length} items
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-neon-cyan/30">
                More projects coming soon...
            </div>
        </div>
    );
};
