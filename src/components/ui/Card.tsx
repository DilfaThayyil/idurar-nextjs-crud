import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    hover = false,
    padding = 'md'
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div
            className={cn(
                'bg-white rounded-2xl border border-neutral-200 shadow-soft',
                hover && 'hover:shadow-medium transition-shadow duration-200',
                paddingClasses[padding],
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;