'use client';

import React, {useCallback, memo} from 'react';
import ExpandableFilter from '@/components/ui/expandableFilter';

interface Filter {
    title: string;
    options: string[];
    multiSelect: boolean;
}

interface SelectedFilter {
    name: string;
    value: string;
    multiSelect: boolean;
}

interface FilterSidebarProps {
    filters: Filter[];
    selectedFilters: SelectedFilter[];
    onSelectFilter: (name: string, value: string, multiSelect: boolean) => void;
    onDeselectFilter: (name: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
                                                         filters,
                                                         selectedFilters,
                                                         onSelectFilter,
                                                         onDeselectFilter,
                                                     }: FilterSidebarProps) => {
    const getSelectedOptions = useCallback(
        (name: string): string[] => {
            return selectedFilters
                .filter((filter: SelectedFilter): boolean => filter.name === name)
                .map((filter: SelectedFilter): string => filter.value);
        },
        [selectedFilters]
    );

    return (
        <div className="p-4 border-r">
            <h2 className="font-semibold text-lg mb-4">Filtrar Por:</h2>
            {filters.map(({title, options, multiSelect}: Filter, index: number) => (
                <ExpandableFilter
                    key={title}
                    title={title}
                    options={options}
                    multiSelect={multiSelect}
                    selectedOptions={getSelectedOptions(title)}
                    onSelect={(value: string): void => onSelectFilter(title, value, multiSelect)}
                    onDeselect={(value: string): void => onDeselectFilter(title, value)}
                    defaultExpanded={index === 0}
                />
            ))}
        </div>
    );
};

export default memo(FilterSidebar);
