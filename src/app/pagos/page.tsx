// Pagos.tsx
"use client";
// Pagos.tsx
import { useState } from 'react';

export default function Pagos() {
  const [isPaid, setIsPaid] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    setIsPaid(true);
  };

  return (
    <main className="px-4 py-10 sm:px-8 sm:py-16">
      <h1 className="text-3xl font-semibold text-center text-primary mb-6">Formulario de Pagos</h1>

      {!isPaid ? (
        <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-secondary-foreground">Número de tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="mt-2 block w-full px-4 py-2 border border-input rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-secondary-foreground">Fecha de expiración</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/AA"
              maxLength={5}
              className="mt-2 block w-full px-4 py-2 border border-input rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="cvv" className="block text-sm font-medium text-secondary-foreground">CVV</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              maxLength={3}
              className="mt-2 block w-full px-4 py-2 border border-input rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            onClick={handlePayment}
            className="w-full py-3 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Pagar
          </button>
        </form>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold text-primary">Pago Procesado Exitosamente</h2>
          <p className="mt-2 text-muted-foreground">Gracias por tu compra. Tu reserva ha sido confirmada.</p>
        </div>
      )}
    </main>
  );
}
