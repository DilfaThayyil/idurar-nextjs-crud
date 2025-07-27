import axios from 'axios';
import { Project, PaginatedResponse } from '@/types/project';

const BASE_URL = '/api/projects';

export const fetchProjects = async (
    page: number,
    limit: number,
    searchQuery?: string,
    status?: string
): Promise<PaginatedResponse<Project>> => {
    const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
    };

    if (searchQuery) params.search = searchQuery;
    if (status) params.status = status;

    const response = await axios.get<PaginatedResponse<Project>>(BASE_URL, {
        params,
    });

    return response.data;
};

export const createProject = async (
    projectData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>
) => {
    const response = await axios.post(BASE_URL, projectData);
    return response.data;
};

export const updateProject = async (
    id: string,
    projectData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>
) => {
    const response = await axios.put(`${BASE_URL}/${id}`, projectData);
    return response.data;
};

export const deleteProject = async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
