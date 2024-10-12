import React, { useState, FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
    title: string;
    children: React.ReactNode;
}

export const Dropdown: FC<DropdownProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="w-full border-b border-gray-300 py-2">
            <div
                className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-100"
                onClick={toggleDropdown}
            >
                <h2 className="font-semibold text-lg text-blue-900">{title}</h2>
                {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
            </div>
            {isOpen && <div className="px-6 pb-4">{children}</div>}
        </div>
    );
};
