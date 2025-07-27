'use client';
import React, { useState, useEffect } from 'react';
import Input from './Input';

interface SearchInputProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    debounceMs?: number;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Search...",
    onSearch,
    debounceMs = 300,
    className
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch, debounceMs]);

    return (
        <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            }
            className={className}
            fullWidth={false}
        />
    );
};

export default SearchInput;