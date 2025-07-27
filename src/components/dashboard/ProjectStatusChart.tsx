'use client';
import React from 'react';
import Card from '@/components/ui/Card';
import { Project, ProjectStatus } from '@/types/project';

interface ProjectStatusChartProps {
    projects: Project[];
    loading?: boolean;
}

const ProjectStatusChart: React.FC<ProjectStatusChartProps> = ({ projects, loading }) => {
    const getStatusStats = () => {
        const stats = {
            [ProjectStatus.PENDING]: 0,
            [ProjectStatus.ACTIVE]: 0,
            [ProjectStatus.IN_PROGRESS]: 0,
            [ProjectStatus.ON_HOLD]: 0,
            [ProjectStatus.COMPLETED]: 0,
            [ProjectStatus.CANCELLED]: 0
        };

        projects.forEach(project => {
            stats[project.status]++;
        });

        return stats;
    };

    const stats = getStatusStats();
    const total = projects.length;

    const statusConfig = {
        [ProjectStatus.PENDING]: {
            label: 'Pending',
            color: 'bg-success-500',
            lightColor: 'bg-success-100',
            textColor: 'text-success-700'
        },
        [ProjectStatus.ACTIVE]: {
            label: 'Active',
            color: 'bg-secondary-500',
            lightColor: 'bg-secondary-100',
            textColor: 'text-secondary-700'
        },
        [ProjectStatus.IN_PROGRESS]: {
            label: 'In Progress',
            color: 'bg-secondary-500',
            lightColor: 'bg-secondary-100',
            textColor: 'text-secondary-700'
        },
        [ProjectStatus.ON_HOLD]: {
            label: 'On Hold',
            color: 'bg-warning-500',
            lightColor: 'bg-warning-100',
            textColor: 'text-warning-700'
        },
        [ProjectStatus.COMPLETED]: {
            label: 'Completed',
            color: 'bg-primary-500',
            lightColor: 'bg-primary-100',
            textColor: 'text-primary-700'
        },
        [ProjectStatus.CANCELLED]: {
            label: 'Cancelled',
            color: 'bg-error-500',
            lightColor: 'bg-error-100',
            textColor: 'text-error-700'
        }
    };

    if (loading) {
        return (
            <Card>
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Project Status</h3>
                <div className="animate-pulse space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-neutral-200 rounded-full"></div>
                                <div className="h-4 bg-neutral-200 rounded w-20"></div>
                            </div>
                            <div className="h-4 bg-neutral-200 rounded w-8"></div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Project Status</h3>

            {total === 0 ? (
                <div className="text-center py-8">
                    <p className="text-neutral-600">No projects to display</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(statusConfig).map(([status, config]) => {
                        const count = stats[status as ProjectStatus];
                        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

                        return (
                            <div key={status} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full ${config.color}`}></div>
                                    <span className="text-sm font-medium text-neutral-700">
                                        {config.label}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-neutral-600">{count}</span>
                                    <div className="w-20 bg-neutral-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${config.color}`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-neutral-500 w-8 text-right">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Card>
    );
};

export default ProjectStatusChart;