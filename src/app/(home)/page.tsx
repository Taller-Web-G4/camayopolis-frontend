'use client'
import { Announcement } from "@/components/home/Announcement";
import { FilterSearch } from "@/components/home/FilterSearch";
import { MovieList } from "@/components/home/MovieList/MovieList";
import { MovieListTitle } from "../../components/shared/MovieListTitle";
import { CategorySelector } from "@/components/home/CategorySelector";
import { useState } from "react";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>('En cartelera');

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <main>
            <Announcement />
            <div className="flex flex-col items-center justify-center w-full px-4">
                <div className="max-w-6xl w-full">
                    <FilterSearch />
                    <div className="flex flex-row items-center justify-between">
                        <MovieListTitle title="Películas"  color="text-gray-300"/>
                        <CategorySelector
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleSelectCategory}
                        />
                    </div>
                    <MovieList category={selectedCategory} />
                </div>
            </div>
        </main>
    );
}

