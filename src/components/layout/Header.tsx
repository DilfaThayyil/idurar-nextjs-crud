'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { User } from '@/types/auth';

interface HeaderProps {
    user?: User;
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Projects', href: '/projects' },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">P</span>
                            </div>
                            <span className="text-xl font-bold text-neutral-900">ProjectHub</span>
                        </Link>
                    </div>

                    {user && (
                        <nav className="hidden md:flex space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                        isActive(item.href)
                                            ? 'bg-primary-100 text-primary-700'
                                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    )}

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                                    <p className="text-xs text-neutral-500">{user.email}</p>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;