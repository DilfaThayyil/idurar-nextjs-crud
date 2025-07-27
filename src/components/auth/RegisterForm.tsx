'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { RegisterCredentials } from '@/types/auth';

interface RegisterFormProps {
    onSubmit: (credentials: RegisterCredentials) => Promise<void>;
    loading?: boolean;
    error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Partial<RegisterCredentials>>({});

    const validate = (): boolean => {
        const newErrors: Partial<RegisterCredentials> = {};

        if (!credentials.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!credentials.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!credentials.password) {
            newErrors.password = 'Password is required';
        } else if (credentials.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (credentials.password !== credentials.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            await onSubmit(credentials);
        }
    };

    const handleChange = (field: keyof RegisterCredentials) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCredentials((prev: any) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors((prev: any) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900">Create Account</h1>
                    <p className="text-neutral-600 mt-2">Join us and start managing your projects</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Full Name"
                        type="text"
                        value={credentials.name}
                        onChange={handleChange('name')}
                        error={errors.name}
                        placeholder="Enter your full name"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        value={credentials.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        placeholder="Enter your email"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange('password')}
                        error={errors.password}
                        placeholder="Create a password"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={credentials.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        error={errors.confirmPassword}
                        placeholder="Confirm your password"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        required
                    />

                    <Button type="submit" loading={loading} className="w-full">
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-neutral-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RegisterForm;