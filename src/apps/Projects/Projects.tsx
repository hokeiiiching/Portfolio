import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    color: string;
    link?: string;
    github?: string;
    images?: string[];
}

const projects: Project[] = [
    {
        title: 'MineCode',
        description: 'Distributed AI agent for Minecraft using Docker containers on GCP. Features real-time bidirectional communication and n8n workflow automation.',
        tags: ['Docker', 'GCP', 'Python', 'REST APIs', 'n8n'],
        color: 'cyan',
        github: 'https://github.com/hokeiiiching',
        images: [
            'https://images.unsplash.com/photo-1607799275518-d6e690c7b059?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        title: 'RegTok',
        description: 'AI-powered legal compliance system with RAG pipeline using LangChain and ChromaDB. Reduced manual legal review workloads by 70%.',
        tags: ['Python', 'LangChain', 'ChromaDB', 'RAG', 'AI'],
        color: 'magenta',
        images: [
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
        ]
    },
    {
        title: 'HealthHack App',
        description: 'Cross-platform mobile app for medication tracking with AWS IoT integration for smart pill dispensers.',
        tags: ['React Native', 'AWS IoT', 'Expo', 'Mobile'],
        color: 'green',
        images: []
    },
    {
        title: 'Portfolio OS',
        description: 'This very website! A cyberpunk-themed interactive desktop portfolio built with React and TailwindCSS.',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
        color: 'pink',
        link: 'https://hokeiiiching.vercel.app',
        images: [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
        ]
    },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    const hasImages = project.images && project.images.length > 0;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (project.images) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
        }
    };

    return (
        <article className={`
            bg-cyber-surface border ${colorClasses.border} rounded-lg overflow-hidden
            hover:border-opacity-60 transition-all duration-200
            group cursor-default flex flex-col
        `}>
            {/* Image Carousel */}
            {hasImages ? (
                <div className="relative h-48 w-full bg-black/50 overflow-hidden group/image border-b border-white/5">
                    <img
                        src={project.images![currentImageIndex]}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-surface to-transparent opacity-60" />

                    {/* Controls */}
                    {project.images!.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-neon-cyan opacity-0 group-hover/image:opacity-100 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-neon-cyan opacity-0 group-hover/image:opacity-100 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                {project.images!.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-neon-cyan' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="h-24 w-full bg-black/20 flex items-center justify-center border-b border-white/5">
                    <ImageIcon className="text-white/10" size={32} />
                </div>
            )}

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
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-neon-cyan/50 hover:text-neon-cyan transition-colors"
                            >
                                <Github size={16} />
                            </a>
                        )}
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
