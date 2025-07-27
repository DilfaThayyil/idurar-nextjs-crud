import React from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    fullWidth?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, fullWidth = true, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col', fullWidth && 'w-full')}>
                {label && (
                    <label className="text-sm font-medium text-neutral-700 mb-2">
                        {label}
                        {props.required && <span className="text-error-500 ml-1">*</span>}
                    </label>
                )}
                <select
                    className={cn(
                        'w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
                        'text-neutral-900 bg-white',
                        error && 'border-error-500 focus:ring-error-500 focus:border-error-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <span className="mt-1 text-sm text-error-500">{error}</span>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;