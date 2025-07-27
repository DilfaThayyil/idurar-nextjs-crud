'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentProjects from '@/components/dashboard/RecentProjects';
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart';
import QuickActions from '@/components/dashboard/QuickActions';
import Modal from '@/components/ui/Modal';
import ProjectForm from '@/components/projects/ProjectForm';
import { Project, ProjectStatus } from '@/types/project';
import { createProject, fetchProjects as fetchProjectsAPI } from '@/services/projectService';
import toast from 'react-hot-toast';
import { User } from '@/types/auth';

interface DashboardPageProps {
    user: User;
    onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formLoading, setFormLoading] = useState(false);

    const itemsPerPage = 12;


    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await fetchProjectsAPI(currentPage, itemsPerPage, '', '');
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


    const getProjectStats = () => {
        const total = projects.length;
        const active = projects.filter(p => p.status === ProjectStatus.ACTIVE).length;
        const completed = projects.filter(p => p.status === ProjectStatus.COMPLETED).length;
        const onHold = projects.filter(p => p.status === ProjectStatus.ON_HOLD).length;

        return { total, active, completed, onHold };
    };

    const stats = getProjectStats();

    return (
        <DashboardLayout user={user} onLogout={onLogout}>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-neutral-600 mt-2">
                        Here's what's happening with your projects today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Projects"
                        value={stats.total}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        }
                        color="primary"
                    />

                    <StatsCard
                        title="Active Projects"
                        value={stats.active}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        }
                        color="success"
                    />

                    <StatsCard
                        title="Completed"
                        value={stats.completed}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        color="secondary"
                    />

                    <StatsCard
                        title="On Hold"
                        value={stats.onHold}
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        color="warning"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <RecentProjects projects={projects} loading={loading} />
                    </div>

                    <div className="space-y-8">
                        <ProjectStatusChart projects={projects} loading={loading} />
                        <QuickActions onCreateProject={() => setShowCreateModal(true)} />
                    </div>
                </div>
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
                    loading={createLoading}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default DashboardPage;