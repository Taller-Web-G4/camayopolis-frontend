import React from 'react';

interface CategorySelectorProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex space-x-6">
            <button
                className={`relative text-lg font-semibold border-b-4 border-transparent before:absolute before:bottom-0 before:left-0 before:h-1 before:bg-rose-600 before:transition-all before:duration-300 ${
                    selectedCategory === 'En cartelera'
                        ? 'before:w-1/2 text-black hover:before:w-3/4'
                        : 'before:w-0 text-gray-500 hover:before:w-3/4'
                }`}
                onClick={() => onSelectCategory('En cartelera')}
            >
                En cartelera
            </button>
            <button
                className={`relative text-lg font-semibold border-b-4 border-transparent before:absolute before:bottom-0 before:left-0 before:h-1 before:bg-rose-600 before:transition-all before:duration-300 ${
                    selectedCategory === 'Próximos estrenos'
                        ? 'before:w-1/2 text-black hover:before:w-3/4'
                        : 'before:w-0 text-gray-500 hover:before:w-3/4'
                }`}
                onClick={() => onSelectCategory('Próximos estrenos')}
            >
                Próximos estrenos
            </button>
        </div>
    );
};