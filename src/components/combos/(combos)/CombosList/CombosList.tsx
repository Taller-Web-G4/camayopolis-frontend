import { useState } from 'react';
import {ComboCardProps, ComboCardPropsWithDelete} from '../../../../interfaces/models/combo.interface'
import ConfirmationModal from '@/components/shared/ConfirmationModal/ConfirmationModal';
import {comboApi} from '@/api/backend/endpoints/combo.api'; 

export const ComboCard: React.FC<ComboCardProps> = ({ combo, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await comboApi.deleteCombo(combo.id);
            console.log(`Combo eliminado: ${combo.name}`);
            setIsModalOpen(false);
            onDelete(combo.id);
        } catch (error) {
            console.error('Error al eliminar el combo:', error);
        }
    };

    return (
        <div className="relative bg-white shadow-md rounded-lg p-4 w-72 flex flex-col items-center">
            {/* Botón de eliminar */}
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                onClick={handleDeleteClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </button>

            {/* Modal de confirmación */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Eliminar Combo"
                message={`¿Estás seguro de que deseas eliminar el combo "${combo.name}"?`}
            />

            {/* Imagen y contenido de la tarjeta */}
            <img
                src={combo.imageUrl}
                alt={combo.name}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{combo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{combo.description}</p>
            <p className="text-sm font-bold text-gray-800">Precio: S/.{combo.price.toFixed(2)}</p>
        </div>
    );
};