'use client';

import { useState, useEffect } from 'react';
import { getReservationsByUser, getReservationsByUserAndDate } from '@/api/backend/endpoints/reservations.api';

export default function HistorialReservas() {
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = 1;

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const data = await getReservationsByUser(userId);
        setReservations(data);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [userId]);

  const handleSearchByDate = async () => {
    if (!startDate || !endDate) {
      alert('Por favor selecciona ambas fechas');
      return;
    }
    setLoading(true);
    try {
      const data = await getReservationsByUserAndDate(userId, startDate, endDate);
      setReservations(data);
    } catch (error) {
      console.error('Error al filtrar las reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8" style={{ paddingTop: '100px' /* Ajuste para evitar superposición */ }}>
      <h1 className="text-2xl font-bold mb-6">Historial de Reservas</h1>
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleSearchByDate}
          disabled={loading}
          className="mt-4 sm:mt-7 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Cargando...' : 'Filtrar'}
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Película
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cinema
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asientos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Reserva
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No hay reservas disponibles
              </td>
            </tr>
          ) : (
            reservations.map((reserva: any) => (
              <tr key={reserva.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {reserva.movieTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.cinemaName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reserva.reservationDate).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
