'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardPage from "@/components/pages/DashboardPage";
import { useUserStore } from '@/store/userStore';
import { logout } from '@/services/authService';

export default function Dashboard() {
    const router = useRouter();
    const { user, clearUser } = useUserStore();

    const handleLogout = async () => {
        try {
            await logout();
            clearUser();
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <DashboardPage
            user={user}
            onLogout={handleLogout}
        />
    );
}