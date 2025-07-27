import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
                <div
                    className={cn(
                        'relative w-full bg-white rounded-2xl shadow-large animate-scale-in',
                        sizes[size]
                    )}
                >
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                            {title && (
                                <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                            )}
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;