'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/auth/RegisterForm';
import { RegisterCredentials } from '@/types/auth';
import { registerUser } from '@/services/authService';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleRegister = async (credentials: RegisterCredentials): Promise<void> => {
        setLoading(true);
        setError('');

        try {
            console.log("creadentails : ",credentials)
            await registerUser(credentials);
            toast.success('Registration successful!')
            router.push('/login?message=Registration successful! Please sign in.');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterForm
            onSubmit={handleRegister}
            loading={loading}
            error={error}
        />
    );
}
