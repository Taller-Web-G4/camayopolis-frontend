'use client'

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { X , ChevronDown } from 'lucide-react';

interface SelectProps {
    label: string;
    description: string;
    options: string[];
    selectedOption: string | null;
    onSelect: (option: string) => void;
    onClear: () => void;
}

const SelfSelector: React.FC<SelectProps> = ({ label, description, options, selectedOption, onSelect, onClear }) => {
    return (
        <div className="text-center relative">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="text-black font-extrabold text-lg flex flex-col items-start">
                    <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        <ChevronDown size={16} className="text-gray-500"/>
                    </div>
                    <span className="text-xs font-normal text-sm text-gray-500">
                        {selectedOption ? selectedOption : description}
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md rounded-md">
                    {options.map((option) => (
                        <DropdownMenuItem key={option} onClick={() => onSelect(option)}>
                            {option}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {selectedOption && (
                <button
                    onClick={onClear}
                    className="absolute bottom-0 right-0 mt-2 mr-0 text-red-500 hover:text-red-700"
                    aria-label={`Clear ${label}`}
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SelfSelector;