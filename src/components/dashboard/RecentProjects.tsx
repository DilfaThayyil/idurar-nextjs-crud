'use client';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Project, ProjectStatus } from '@/types/project';
import { formatDate } from '@/lib/utils';

interface RecentProjectsProps {
    projects: Project[];
    loading?: boolean;
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects, loading }) => {
    const getStatusVariant = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.ACTIVE:
                return 'success';
            case ProjectStatus.COMPLETED:
                return 'primary';
            case ProjectStatus.ON_HOLD:
                return 'warning';
            case ProjectStatus.CANCELLED:
                return 'error';
            default:
                return 'neutral';
        }
    };

    if (loading) {
        return (
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-neutral-900">Recent Projects</h3>
                </div>
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-neutral-200 rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">Recent Projects</h3>
                <Link href="/projects">
                    <Button variant="ghost" size="sm">
                        View All
                    </Button>
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-neutral-600">No projects yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                        <div key={project._id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {project.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 truncate">
                                    {project.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    {formatDate(project.createdAt)}
                                </p>
                            </div>
                            <Badge variant={getStatusVariant(project.status)} size="sm">
                                {project.status.replace('_', ' ')}
                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RecentProjects;