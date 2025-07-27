'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { LoginCredentials } from '@/types/auth';
import { loginUser } from '@/services/authService';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/userStore';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const successMessage = searchParams.get('message');

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(credentials);
      console.log(res.user)
      if (res.user) {
        useUserStore.getState().setUser(res.user); 
      }
      toast.success('Login successful!')
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
}