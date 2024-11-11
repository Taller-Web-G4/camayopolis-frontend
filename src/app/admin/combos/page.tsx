"use client";

import React, { useState, useEffect } from 'react';
import {ComboCard} from '@/components/combos/(combos)/CombosList/CombosList';
import AddComboModal from '@/components/combos/(combos)/AddComboModal/AddComboModal';
import { Combo } from '@/interfaces/models/combo.interface';
import {comboApi} from '@/api/backend/endpoints/combo.api'

const ITEMS_PER_PAGE = 12;

const CombosPage = () => {
    const [combos, setCombos] = useState<Combo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchCombos = async () => {
        try {
            const response = await comboApi.getCombo();
            setCombos(response.data);
        } catch (error) {
            console.error('Error al obtener los combos:', error);
        }
    };

    useEffect(() => {
        fetchCombos();
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentCombos = combos.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(combos.length / ITEMS_PER_PAGE);

    const handleAddCombo = async (newCombo: Omit<Combo, 'id'>) => {
        try {
            const response = await comboApi.addCombo(newCombo);
            setCombos([...combos, response.data]);
        } catch (error) {
            console.error('Error al añadir el combo:', error);
        }
    };

    const handleDeleteCombo = (id: number) => {
        const updatedCombos = combos.filter((combo) => combo.id !== id);
        setCombos(updatedCombos);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 mt-8">Gestión de Combos</h1>

            <button
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={() => setIsModalOpen(true)}
            >
                Añadir Combo
            </button>

            <AddComboModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCombo={handleAddCombo}
            />

            <div className="w-full max-w-5xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(currentCombos) && currentCombos.map((combo) => (
                        <ComboCard key={combo.id} combo={combo} onDelete={handleDeleteCombo} />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-lg">Página {currentPage} de {totalPages}</span>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CombosPage;