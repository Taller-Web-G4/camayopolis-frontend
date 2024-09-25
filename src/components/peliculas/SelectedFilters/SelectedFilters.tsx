'use client'

import React from 'react';

interface Filter {
    name: string;
    value: string;
    multiSelect: boolean;
}

interface SelectedFiltersProps {
    filters: Filter[];
    onRemove: (filterName: string, filterValue: string) => void;
}

export const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters, onRemove }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter: Filter) => (
                <button
                    key={`${filter.name}-${filter.value}`}
                    onClick={(): void => onRemove(filter.name, filter.value)}
                    className={`flex items-center space-x-1 rounded-full px-6 py-0 text-sm font-normal ${
                        filter.multiSelect ? 'text-rose-600 border border-rose-600' : 'text-gray-400 border border-gray-400'
                    }`}
                >
                    <span>{filter.value}</span>
                    <span className="text-lg cursor-pointer pl-3">×</span>
                </button>
            ))}
        </div>
    );
};

export default SelectedFilters;