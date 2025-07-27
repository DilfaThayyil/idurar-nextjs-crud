'use client';
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    options: FilterOption[];
    selectedValue?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
    label?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    placeholder = "Filter",
    label
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === selectedValue);

    return (
        <div className="relative" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {label}
                </label>
            )}
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="justify-between min-w-[150px]"
                icon={
                    <svg
                        className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                }
            >
                {selectedOption ? selectedOption.label : placeholder}
            </Button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-medium">
                    <div className="py-2">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onSelect(option.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    'w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 transition-colors',
                                    selectedValue === option.value && 'bg-primary-50 text-primary-700'
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;