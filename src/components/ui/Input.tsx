import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, fullWidth = true, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col', fullWidth && 'w-full')}>
                {label && (
                    <label className="text-sm font-medium text-neutral-700 mb-2">
                        {label}
                        {props.required && <span className="text-error-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                            {icon}
                        </div>
                    )}
                    <input
                        className={cn(
                            'w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                            'placeholder:text-neutral-400 text-neutral-900',
                            icon && 'pl-10',
                            error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <span className="mt-1 text-sm text-error-500">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;