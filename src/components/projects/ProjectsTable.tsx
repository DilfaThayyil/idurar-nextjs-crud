'use client';
import React from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Project, ProjectStatus } from '@/types/project';
import { formatDate } from '@/lib/utils';

interface ProjectsTableProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
    loading?: boolean;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
    projects,
    onEdit,
    onDelete,
    loading
}) => {
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
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft">
                <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading projects...</p>
                </div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft">
                <div className="p-12 text-center">
                    <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects found</h3>
                    <p className="text-neutral-600">Get started by creating your first project.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Project
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Updated
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {projects.map((project) => (
                            <tr key={project._id} className="hover:bg-neutral-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-medium text-neutral-900">
                                            {project.name}
                                        </div>
                                        <div className="text-sm text-neutral-500">
                                            ID: {project.projectId}
                                        </div>
                                        <div className="text-sm text-neutral-600 mt-1 line-clamp-2">
                                            {project.description}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={getStatusVariant(project.status)}>
                                        {project.status.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-600">
                                    {formatDate(project.createdAt)}
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-600">
                                    {project.updatedAt ? formatDate(project.updatedAt) : '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onEdit(project)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => onDelete(project._id!)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectsTable;