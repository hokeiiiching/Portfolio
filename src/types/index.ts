import type { ReactNode } from 'react';

export interface WindowState {
    id: string;
    title: string;
    icon?: ReactNode;
    component: ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

export interface DesktopIcon {
    id: string;
    label: string;
    icon: ReactNode;
    appId: string;
}
