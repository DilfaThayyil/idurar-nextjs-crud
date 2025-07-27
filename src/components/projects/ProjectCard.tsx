'use client';
import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Project, ProjectStatus } from '@/types/project';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
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

    const getStatusIcon = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.ACTIVE:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case ProjectStatus.COMPLETED:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case ProjectStatus.ON_HOLD:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case ProjectStatus.CANCELLED:
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <Card hover className="h-full">
            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {project.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <Badge
                        variant={getStatusVariant(project.status)}
                        className="flex items-center gap-1"
                    >
                        {getStatusIcon(project.status)}
                        {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-xs text-neutral-500">
                        ID: {project.projectId}
                    </span>
                </div>

                <div className="mt-auto">
                    <div className="text-xs text-neutral-500 mb-4">
                        <div>Created: {formatDate(project.createdAt)}</div>
                        {project.updatedAt && (
                            <div>Updated: {formatDate(project.updatedAt)}</div>
                        )}
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(project)}
                            className="flex-1"
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            }
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => onDelete(project._id!)}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            }
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;