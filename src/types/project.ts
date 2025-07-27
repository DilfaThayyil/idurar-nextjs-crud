export interface Project {
    _id?: string;
    projectId: string;
    name: string;
    description: string;
    status: ProjectStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ProjectStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    IN_PROGRESS = 'in_progress',
    ON_HOLD = 'on_hold',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
  }
  
export interface PaginatedResponse<T> {
    projects: never[];
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}