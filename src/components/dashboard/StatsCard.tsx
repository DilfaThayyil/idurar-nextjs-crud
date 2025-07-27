'use client';
import React from 'react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        type: 'increase' | 'decrease';
    };
    icon: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    change,
    icon,
    color = 'primary'
}) => {
    const colorClasses = {
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        success: 'bg-success-500 text-white',
        warning: 'bg-warning-500 text-white',
        error: 'bg-error-500 text-white'
    };

    return (
        <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-600 mb-1">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-neutral-900">
                        {value}
                    </p>
                    {change && (
                        <div className="flex items-center mt-2">
                            <span
                                className={cn(
                                    'flex items-center text-sm font-medium',
                                    change.type === 'increase' ? 'text-success-600' : 'text-error-600'
                                )}
                            >
                                {change.type === 'increase' ? (
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                                    </svg>
                                )}
                                {Math.abs(change.value)}%
                            </span>
                            <span className="text-sm text-neutral-500 ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={cn('p-3 rounded-xl', colorClasses[color])}>
                    {icon}
                </div>
            </div>
        </Card>
    );
};

export default StatsCard;
