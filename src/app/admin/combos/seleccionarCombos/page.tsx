"use client";

import React, { useState, useEffect } from 'react';
import SelectCombos from '@/components/combos/(combos)/seleccionarCombos/selectCombos';
import { Combo } from '@/interfaces/models/combo.interface';

const SeleccionarCombosPage = () => {
  const [selectedCombos, setSelectedCombos] = useState<
    { combo: Combo; quantity: number }[]
  >([]);

  const handleAddToReservation = (combosToAdd: { combo: Combo; quantity: number }[]) => {
    setSelectedCombos(combosToAdd);
    console.log('Combos seleccionados para la reserva:', combosToAdd);
  };

  // Calcular el precio total de los combos seleccionados
  const totalPrice = selectedCombos.reduce(
    (total, { combo, quantity }) => total + combo.price * quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        Crear Reserva
      </h1>

      {/* Componente para seleccionar los combos */}
      <SelectCombos onAddToReservation={handleAddToReservation} />

      {/* Combos seleccionados */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Combos Seleccionados:</h2>

        {selectedCombos.length > 0 ? (
          <div className="space-y-4">
            {selectedCombos.map(({ combo, quantity }) => (
              <div
                key={combo.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
              >
                {/* Información del combo */}
                <div className="flex items-center">
                  <img
                    src={combo.imageUrl}
                    alt={combo.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{combo.name}</h3>
                    <p className="text-sm text-gray-600">Precio unitario: S/. {combo.price}</p>
                  </div>
                </div>

                {/* Cantidad y total */}
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 mr-4">Cantidad: {quantity}</span>
                  <span className="text-gray-800">Total: S/. {combo.price * quantity}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No has seleccionado ningún combo aún.</p>
        )}

        {/* Precio total */}
        {selectedCombos.length > 0 && (
          <div className="mt-6 p-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md">
            <p className="text-center">Total: S/. {totalPrice}</p>
          </div>
        )}

        {/* Botón de Confirmar Reserva */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => alert('Reserva confirmada!')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={selectedCombos.length === 0}
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeleccionarCombosPage;
