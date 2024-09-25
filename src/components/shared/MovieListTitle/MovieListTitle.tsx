import React from 'react';

interface PageTitleProps {
    title: string;
    color: string;
}

export const MovieListTitle: React.FC<PageTitleProps> = ({ title, color }) => {
    return <h1 className={`text-6xl font-black font-sans ${color}`}>{title}</h1>;
};