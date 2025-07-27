export interface User {
    _id?: string;
    email: string;
    name: string;
    role?: 'admin' | 'user';
    createdAt?: Date;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    confirmPassword: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}