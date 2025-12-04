import { Mail, Phone, Linkedin, Github, Calendar, Briefcase, GraduationCap, Code, Award, Terminal } from 'lucide-react';

export const Resume: React.FC = () => {
    return (
        <div className="h-full overflow-auto bg-cyber-bg font-mono">
            {/* Header */}
            <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border-b border-neon-cyan/30 p-6">
                <div className="flex items-center gap-2 text-xs text-neon-cyan/50 mb-2">
                    <Terminal size={12} />
                    <span>~/documents/resume.pdf</span>
                </div>
                <h1 className="text-2xl font-bold text-neon-cyan font-cyber mb-1">HO KEI CHING</h1>
                <p className="text-neon-magenta mb-4">Software Engineer | Full Stack Developer</p>

                <div className="flex flex-wrap gap-4 text-sm">
                    <a href="mailto:hokeiching.work@gmail.com" className="flex items-center gap-1 text-neon-cyan/70 hover:text-neon-cyan">
                        <Mail size={12} /> hokeiching.work@gmail.com
                    </a>
                    <span className="flex items-center gap-1 text-neon-cyan/70">
                        <Phone size={12} /> (+65) 9680 9818
                    </span>
                    <a href="https://linkedin.com/in/ho-kei-ching" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neon-cyan/70 hover:text-neon-cyan">
                        <Linkedin size={12} /> LinkedIn
                    </a>
                    <a href="https://github.com/hokeiiiching" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-neon-cyan/70 hover:text-neon-cyan">
                        <Github size={12} /> GitHub
                    </a>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Experience */}
                <section>
                    <h2 className="text-sm font-bold text-neon-magenta mb-4 flex items-center gap-2">
                        <Briefcase size={14} /> EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        <div className="border-l-2 border-neon-cyan pl-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-neon-cyan">Freelance Web App Developer</h3>
                                <span className="text-xs text-neon-cyan/50 flex items-center gap-1">
                                    <Calendar size={10} /> Nov 2025 - Present
                                </span>
                            </div>
                            <p className="text-sm text-neon-green mb-2">OnTheGroundSG</p>
                            <ul className="text-sm text-neon-cyan/70 space-y-1">
                                <li>{">"} Developed custom internal tools reducing admin time by 20-30%</li>
                                <li>{">"} Delivered MVPs using rapid development frameworks</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-neon-magenta pl-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-medium text-neon-magenta">Software Engineer Intern</h3>
                                <span className="text-xs text-neon-cyan/50 flex items-center gap-1">
                                    <Calendar size={10} /> Feb 2025 – Jul 2025
                                </span>
                            </div>
                            <p className="text-sm text-neon-green mb-2">Guidesify | SaaS Startup</p>
                            <ul className="text-sm text-neon-cyan/70 space-y-1">
                                <li>{">"} Architected frontend redesign with Svelte 5, boosted conversion 300%</li>
                                <li>{">"} Engineered image classification pipeline, reduced QA by 80%</li>
                                <li>{">"} Integrated GenAI workflows for automated content generation</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-sm font-bold text-neon-magenta mb-4 flex items-center gap-2">
                        <GraduationCap size={14} /> EDUCATION
                    </h2>

                    <div className="border-l-2 border-neon-green pl-4">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-neon-green">National University of Singapore</h3>
                            <span className="text-xs text-neon-cyan/50">2025 – 2029</span>
                        </div>
                        <p className="text-sm text-neon-cyan/70 mb-1">Computer Science & Business Admin (Double Degree)</p>
                        <p className="text-xs text-neon-yellow flex items-center gap-1">
                            <Award size={10} /> NUS Merit Scholarship
                        </p>
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-sm font-bold text-neon-magenta mb-4 flex items-center gap-2">
                        <Code size={14} /> SKILLS
                    </h2>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-neon-cyan/50 text-xs mb-2">Languages</div>
                            <div className="flex flex-wrap gap-1">
                                {['TypeScript', 'Python', 'C++', 'SQL'].map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs border border-neon-cyan/30 text-neon-cyan rounded">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-neon-cyan/50 text-xs mb-2">Frontend</div>
                            <div className="flex flex-wrap gap-1">
                                {['React', 'Svelte', 'TailwindCSS'].map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs border border-neon-magenta/30 text-neon-magenta rounded">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-neon-cyan/50 text-xs mb-2">Backend</div>
                            <div className="flex flex-wrap gap-1">
                                {['Supabase', 'PostgreSQL', 'Docker'].map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs border border-neon-green/30 text-neon-green rounded">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-neon-cyan/50 text-xs mb-2">AI/ML</div>
                            <div className="flex flex-wrap gap-1">
                                {['LangChain', 'RAG', 'LLM'].map(s => (
                                    <span key={s} className="px-2 py-0.5 text-xs border border-neon-pink/30 text-neon-pink rounded">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
