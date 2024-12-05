"use client";

import React, { useState, useEffect } from 'react';
import { Combo } from '@/interfaces/models/combo.interface';
import { comboApi } from '@/api/backend/endpoints/combo.api';

interface SelectCombosProps {
  onAddToReservation: (selectedCombos: { combo: Combo; quantity: number }[]) => void;
}

const SelectCombos: React.FC<SelectCombosProps> = ({ onAddToReservation }) => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [selectedCombos, setSelectedCombos] = useState<{ [id: number]: number }>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCombos = async () => {
    setIsLoading(true);
    try {
      const response = await comboApi.getCombo();
      setCombos(response.data);
    } catch (error) {
      console.error('Error al obtener los combos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedCombos((prev) => ({
      ...prev,
      [id]: Math.max(0, quantity),
    }));
  };

  const handleAddToReservation = () => {
    const combosToAdd = Object.entries(selectedCombos)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity]) => ({
        combo: combos.find((c) => c.id === parseInt(id))!,
        quantity,
      }));

    onAddToReservation(combosToAdd);
    setSelectedCombos({});
  };
  
  const handleRemoveFromSelection = (id: number) => {
    setSelectedCombos((prev) => {
      const newSelection = { ...prev };
      delete newSelection[id];
      return newSelection;
    });
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Seleccionar Combos</h2>
      {isLoading ? (
        <p className="text-gray-600">Cargando combos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {combos.map((combo) => (
            <div key={combo.id} className="border rounded p-4 shadow-sm bg-white">
              {/* Imagen del Combo */}
              <img
                src={combo.imageUrl}
                alt={combo.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-medium">{combo.name}</h3>
              <p className="text-gray-600">{combo.description}</p>
              <p className="font-bold text-gray-800 mt-2">Precio: S/. {combo.price}</p>
              <div className="flex items-center mt-4">
                <label htmlFor={`quantity-${combo.id}`} className="mr-2">
                  Cantidad:
                </label>
                <input
                  id={`quantity-${combo.id}`}
                  type="number"
                  min="0"
                  value={selectedCombos[combo.id] || 0}
                  onChange={(e) => handleQuantityChange(combo.id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 w-16"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={handleAddToReservation}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        disabled={Object.values(selectedCombos).every((quantity) => quantity === 0)}
      >
        Añadir a Reserva
      </button>
    </div>
  );
};

export default SelectCombos;
