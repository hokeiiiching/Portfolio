import React from 'react';
import { Mail, MapPin, GraduationCap, Briefcase, Award, Code } from 'lucide-react';

export const AboutMe: React.FC = () => {
    return (
        <div className="h-full overflow-auto bg-cyber-bg p-6 font-mono">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta p-0.5">
                    <div className="w-full h-full rounded-lg bg-cyber-dark flex items-center justify-center text-3xl font-bold text-neon-cyan">
                        HK
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-neon-cyan mb-1 font-cyber">
                        HO KEI CHING
                    </h1>
                    <p className="text-neon-magenta mb-3">Software Engineer & Full Stack Developer</p>

                    <div className="flex flex-wrap gap-4 text-sm text-neon-cyan/70">
                        <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-neon-pink" />
                            Singapore
                        </span>
                        <span className="flex items-center gap-1">
                            <Mail size={14} className="text-neon-green" />
                            hokeiching.work@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-cyber-surface border border-neon-cyan/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-neon-cyan mb-1">3+</div>
                    <div className="text-xs text-neon-cyan/60">Projects Built</div>
                </div>
                <div className="bg-cyber-surface border border-neon-magenta/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-neon-magenta mb-1">1</div>
                    <div className="text-xs text-neon-magenta/60">Internship</div>
                </div>
                <div className="bg-cyber-surface border border-neon-green/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-neon-green mb-1">NUS</div>
                    <div className="text-xs text-neon-green/60">Merit Scholar</div>
                </div>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
                <h2 className="text-sm text-neon-magenta mb-3 flex items-center gap-2">
                    <Code size={14} />
                    ABOUT.TXT
                </h2>
                <div className="bg-cyber-surface border border-neon-cyan/10 rounded-lg p-4 text-sm text-neon-cyan/80 leading-relaxed">
                    <p className="mb-3">
                        {">"} Passionate software engineer specializing in full-stack development,
                        AI/ML integrations, and creating exceptional user experiences.
                    </p>
                    <p className="mb-3">
                        {">"} Currently pursuing a Double Degree in Computer Science & Business
                        Administration at the National University of Singapore.
                    </p>
                    <p>
                        {">"} I love building products that solve real-world problems and
                        continuously learning new technologies to push the boundaries of what's possible.
                    </p>
                </div>
            </div>

            {/* Experience & Education */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-sm text-neon-magenta mb-3 flex items-center gap-2">
                        <Briefcase size={14} />
                        EXPERIENCE.LOG
                    </h2>
                    <div className="space-y-3">
                        <div className="bg-cyber-surface border-l-2 border-neon-cyan p-3 rounded-r-lg">
                            <div className="text-sm text-neon-cyan font-medium">Freelance Web Developer</div>
                            <div className="text-xs text-neon-cyan/50">OnTheGroundSG • 2025-Present</div>
                        </div>
                        <div className="bg-cyber-surface border-l-2 border-neon-magenta p-3 rounded-r-lg">
                            <div className="text-sm text-neon-magenta font-medium">Software Engineer Intern</div>
                            <div className="text-xs text-neon-magenta/50">Guidesify • 2025</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-sm text-neon-magenta mb-3 flex items-center gap-2">
                        <GraduationCap size={14} />
                        EDUCATION.SYS
                    </h2>
                    <div className="bg-cyber-surface border-l-2 border-neon-green p-3 rounded-r-lg">
                        <div className="text-sm text-neon-green font-medium">National University of Singapore</div>
                        <div className="text-xs text-neon-green/70">CS & Business Admin (Double Degree)</div>
                        <div className="text-xs text-neon-green/50 mt-1 flex items-center gap-1">
                            <Award size={10} />
                            NUS Merit Scholarship
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
