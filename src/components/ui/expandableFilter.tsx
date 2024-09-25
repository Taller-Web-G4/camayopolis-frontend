'use client'

import React, { useState, useEffect } from 'react';

interface ExpandableFilterProps {
    title: string;
    options: string[];
    multiSelect?: boolean;
    selectedOptions: string[];
    onSelect: (value: string) => void;
    onDeselect: (value: string) => void;
    defaultExpanded?: boolean; // Nueva propiedad para expandir por defecto
}

const ExpandableFilter: React.FC<ExpandableFilterProps> = ({
                                                               title,
                                                               options,
                                                               multiSelect = false,
                                                               selectedOptions,
                                                               onSelect,
                                                               onDeselect,
                                                               defaultExpanded = false, // Valor por defecto para defaultExpanded
                                                           }) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded); // Usar defaultExpanded para el estado inicial

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleOptionSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            onDeselect(option);
        } else {
            onSelect(option);
        }
    };

    return (
        <div className="mb-4">
            <button
                onClick={toggleExpand}
                className="flex justify-between items-center w-full text-left font-medium text-lg py-2 border-b font-sans"
            >
                <span>{title}</span>
                <span>{isExpanded ? '-' : '+'}</span>
            </button>

            <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out font-sans font-normal tracking-wide ${
                    isExpanded ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <ul className="mt-2 pl-4 text-sm text-gray-700">
                    {selectedOptions.length > 0 && !multiSelect ? (
                        <li
                            className="py-1 font-normal text-rose-600 cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {selectedOptions[0]}
                        </li>
                    ) : (
                        options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleOptionSelect(option)}
                                className={`py-1 cursor-pointer hover:text-rose-600 ${
                                    selectedOptions.includes(option) ? 'font-normal text-rose-600' : ''
                                }`}
                            >
                                {option}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ExpandableFilter;
