'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import FilterDropdown from '@/components/ui/FilterDropdown';
import Pagination from '@/components/ui/Pagination';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectForm from '@/components/projects/ProjectForm';
import ProjectsTable from '@/components/projects/ProjectsTable';
import { Project, ProjectStatus, PaginatedResponse } from '@/types/project';
import { fetchProjects as fetchProjectsAPI, createProject, updateProject, deleteProject } from '@/services/projectService';
import toast from 'react-hot-toast';

interface ProjectsPageProps {
    user: any;
    onLogout: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ user, onLogout }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deletingProject, setDeletingProject] = useState<string | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const itemsPerPage = 12;

    useEffect(() => {
        fetchProjects();
    }, [currentPage, searchQuery, statusFilter]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await fetchProjectsAPI(currentPage, itemsPerPage, searchQuery, statusFilter);
            setProjects(data.projects || []);
            setTotalPages(data.totalPages || 1);
            setTotalItems(data.total || 0);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (projectData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => {
        try {
            setFormLoading(true);
            const data = await createProject(projectData);
            if (data.success) {
                setShowCreateModal(false);
                fetchProjects();
                toast.success('Project created successfully!')
            }
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Error creating project')
        } finally {
            setFormLoading(false);
        }
    };

    const handleUpdateProject = async (projectData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingProject?._id) return;

        try {
            setFormLoading(true);
            const data = await updateProject(editingProject._id, projectData);
            if (data.success) {
                setEditingProject(null);
                fetchProjects();
                toast.success('Project updated successfully!')
            }
        } catch (error) {
            console.error('Error updating project:', error);
            toast.error('Error updating project')
        } finally {
            setFormLoading(false);
        }
    };


    const handleDeleteProject = async () => {
        if (!deletingProject) return;

        try {
            setDeleteLoading(true);
            const data = await deleteProject(deletingProject);
            if (data.success) {
                setDeletingProject(null);
                fetchProjects();
                toast.success(data.message)
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        } finally {
            setDeleteLoading(false);
        }
    };


    const statusOptions = [
        { value: '', label: 'All Statuses' },
        { value: ProjectStatus.PENDING, label: 'Pending' },
        { value: ProjectStatus.ACTIVE, label: 'Active'},
        { value: ProjectStatus.IN_PROGRESS, label: 'In Progress'},
        { value: ProjectStatus.ON_HOLD, label: 'On Hold' },
        { value: ProjectStatus.COMPLETED, label: 'Completed' },
        { value: ProjectStatus.CANCELLED, label: 'Cancelled' }
    ];

    return (
        <DashboardLayout user={user} onLogout={onLogout}>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">Projects</h1>
                        <p className="text-neutral-600 mt-2">
                            Manage and track all your projects
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        }
                    >
                        New Project
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SearchInput
                            placeholder="Search projects..."
                            onSearch={setSearchQuery}
                            className="w-full sm:w-80"
                        />
                        <FilterDropdown
                            options={statusOptions}
                            selectedValue={statusFilter}
                            onSelect={setStatusFilter}
                            placeholder="Filter by status"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant={viewMode === 'grid' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            }
                        >
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === 'table' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('table')}
                            icon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            }
                        >
                            Table
                        </Button>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                onEdit={setEditingProject}
                                onDelete={setDeletingProject}
                            />
                        ))}
                    </div>
                ) : (
                    <ProjectsTable
                        projects={projects}
                        onEdit={setEditingProject}
                        onDelete={setDeletingProject}
                        loading={loading}
                    />
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                )}
            </div>

            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Project"
                size="lg"
            >
                <ProjectForm
                    onSubmit={handleCreateProject}
                    onCancel={() => setShowCreateModal(false)}
                    loading={formLoading}
                />
            </Modal>

            <Modal
                isOpen={!!editingProject}
                onClose={() => setEditingProject(null)}
                title="Edit Project"
                size="lg"
            >
                <ProjectForm
                    project={editingProject || undefined}
                    onSubmit={handleUpdateProject}
                    onCancel={() => setEditingProject(null)}
                    loading={formLoading}
                />
            </Modal>

            <ConfirmDialog
                isOpen={!!deletingProject}
                onClose={() => setDeletingProject(null)}
                onConfirm={handleDeleteProject}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
                confirmText="Delete"
                type="danger"
                loading={deleteLoading}
            />
        </DashboardLayout>
    );
};

export default ProjectsPage;