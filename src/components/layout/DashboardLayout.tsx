'use client';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { User } from '@/types/auth';

interface DashboardLayoutProps {
    children: React.ReactNode;
    user?: User;
    onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    user,
    onLogout
}) => {
    return (
        <div className="min-h-screen bg-neutral-50">
            <Header user={user} onLogout={onLogout} />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 lg:pl-64">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;