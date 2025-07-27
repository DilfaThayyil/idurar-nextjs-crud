'use client';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface QuickActionsProps {
    onCreateProject: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onCreateProject }) => {
    const actions = [
        {
            title: 'Create New Project',
            description: 'Start a new project and begin tracking progress',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ),
            action: onCreateProject,
            color: 'primary'
        },
        {
            title: 'View All Projects',
            description: 'Browse and manage all your projects',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            href: '/projects',
            color: 'secondary'
        }
    ];

    return (
        <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
                {actions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-colors">
                        <div className={`p-2 rounded-lg ${action.color === 'primary' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'}`}>
                            {action.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-neutral-900 mb-1">
                                {action.title}
                            </h4>
                            <p className="text-xs text-neutral-600">
                                {action.description}
                            </p>
                        </div>
                        {action.href ? (
                            <Link href={action.href}>
                                <Button variant="outline" size="sm">
                                    Go
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                variant={action.color === 'primary' ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={action.action}
                            >
                                Create
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default QuickActions;