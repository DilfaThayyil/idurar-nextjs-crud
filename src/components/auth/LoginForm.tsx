'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { LoginCredentials } from '@/types/auth';

interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => Promise<void>;
    loading?: boolean;
    error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

    const validate = (): boolean => {
        const newErrors: Partial<LoginCredentials> = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            await onSubmit(credentials);
        }
    };

    const handleChange = (field: keyof LoginCredentials) => (
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
                        <span className="text-black font-bold text-2xl">P</span>
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
                    <p className="text-neutral-600 mt-2">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

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
                        placeholder="Enter your password"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" loading={loading} className="w-full">
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-neutral-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default LoginForm;
