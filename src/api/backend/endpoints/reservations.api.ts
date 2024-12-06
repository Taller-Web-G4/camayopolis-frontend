import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reservations';

export const getReservationsByUser = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

export const getReservationsByUserAndDate = async (
  userId: number,
  startDate: string,
  endDate: string
) => {
  const response = await axios.get(`${BASE_URL}/${userId}/dates`, {
    params: { startDate, endDate },
  });
  return response.data;
};
