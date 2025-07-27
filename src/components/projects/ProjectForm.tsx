'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Project, ProjectStatus } from '@/types/project';

interface ProjectFormProps {
    project?: Project;
    onSubmit: (project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    project,
    onSubmit,
    onCancel,
    loading
}) => {
    const [formData, setFormData] = useState({
        projectId: '',
        name: '',
        description: '',
        status: ProjectStatus.PENDING
    });
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    useEffect(() => {
        if (project) {
            setFormData({
                projectId: project.projectId,
                name: project.name,
                description: project.description,
                status: project.status
            });
        }
    }, [project]);

    const statusOptions = [
        { value: ProjectStatus.PENDING, label: 'Pending' },
        { value: ProjectStatus.ACTIVE, label: 'Active'},
        { value: ProjectStatus.IN_PROGRESS, label: 'In Progress'},
        { value: ProjectStatus.ON_HOLD, label: 'On Hold' },
        { value: ProjectStatus.COMPLETED, label: 'Completed' },
        { value: ProjectStatus.CANCELLED, label: 'Cancelled' }
    ];

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.projectId.trim()) {
            newErrors.projectId = 'Project ID is required';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            await onSubmit(formData);
        }
    };

    const handleChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Project ID"
                    value={formData.projectId}
                    onChange={handleChange('projectId')}
                    error={errors.projectId}
                    placeholder="Enter unique project ID"
                    disabled={!!project}
                    required
                />

                <Select
                    label="Status"
                    value={formData.status}
                    onChange={handleChange('status')}
                    options={statusOptions}
                    required
                />
            </div>

            <Input
                label="Project Name"
                value={formData.name}
                onChange={handleChange('name')}
                error={errors.name}
                placeholder="Enter project name"
                required
            />

            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description <span className="text-error-500">*</span>
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description')(e as any)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    rows={4}
                    placeholder="Enter project description"
                    required
                />
                {errors.description && (
                    <span className="mt-1 text-sm text-error-500">{errors.description}</span>
                )}
            </div>

            <div className="flex justify-end space-x-3 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                >
                    {project ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;