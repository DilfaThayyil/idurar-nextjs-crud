'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectsPage from "@/components/pages/ProjectsPage";

export default function ProjectPage() {
    const user = {
        name: 'Dilfa Thayyil',
        email: 'dilfathayyil@gmail.com'
    }
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     checkAuth();
    // }, []);

    // const checkAuth = async () => {
    //     try {
    //         const token = localStorage.getItem('authToken');
    //         if (!token) {
    //             router.push('/login?redirect=/projects');
    //             return;
    //         }

    //         const response = await fetch('/api/auth/me', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             localStorage.removeItem('authToken');
    //             router.push('/login?redirect=/projects');
    //             return;
    //         }

    //         const data = await response.json();
    //         setUser(data.user);
    //     } catch (error) {
    //         console.error('Auth check failed:', error);
    //         localStorage.removeItem('authToken');
    //         router.push('/login?redirect=/projects');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('authToken');
            router.push('/login');
        }
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    //             <div className="flex flex-col items-center space-y-4">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    //                 <p className="text-neutral-600">Loading projects...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // if (!user) {
    //     return null;
    // }

    return (
        <ProjectsPage
            user={user}
            onLogout={handleLogout}
        />
    );
}