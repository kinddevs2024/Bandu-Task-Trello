import axios from 'axios';

// Используем переменную окружения, которая должна содержать 
// https://api.bandu.uz/api/v1
const API_BASE = process.env.NEXT_PUBLIC_API_BASE; 

if (!API_BASE) {
  // Вывод ошибки, если базовая переменная API не определена
  console.error("CRITICAL ERROR: NEXT_PUBLIC_API_BASE is not defined!");
}

/**
 * 🛠️ Создает экземпляр Axios с общими заголовками и токеном авторизации.
 * @param token JWT токен для заголовка Authorization
 */
const createApiInstance = (token: string) => {
    return axios.create({
        baseURL: `${API_BASE}/`, // Базовый URL внешнего API: https://api.bandu.uz/api/v1/
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        // Устанавливаем таймаут, чтобы избежать бесконечного ожидания
        timeout: 10000 
    });
};

/**
 * 🗺️ Асинхронная функция для получения данных дорожной карты.
 * @param token Токен авторизации.
 */
export async function fetchRoadmap(token: string) {
  if (!API_BASE) throw { status: 500, message: "API_BASE environment variable is missing." };
  
  try {
    const api = createApiInstance(token);
    // Запрос будет выполнен по адресу: https://api.bandu.uz/api/v1/roadmap
    const response = await api.get('roadmap');
    return response.data; 

  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to fetch external roadmap data';
    throw { status, message };
  }
}

/**
 * 👤 Асинхронная функция для получения данных пользователей.
 * @param token Токен авторизации.
 */
export async function fetchUsers(token: string) {
    if (!API_BASE) throw { status: 500, message: "API_BASE environment variable is missing." };
    
    try {
        const api = createApiInstance(token);
        // Запрос будет выполнен по адресу: https://api.bandu.uz/api/v1/users
        const response = await api.get('users'); 
        return response.data || [];
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to fetch user data';
        throw { status, message };
    }
};

/**
 * 📍 Асинхронная функция для получения данных мест (places).
 * @param token Токен авторизации.
 */
export async function fetchPlaces(token: string) {
    if (!API_BASE) throw { status: 500, message: "API_BASE environment variable is missing." };
    
    try {
        const api = createApiInstance(token);
        // Запрос будет выполнен по адресу: https://api.bandu.uz/api/v1/places
        const res = await api.get('places');
        return res.data || [];
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to fetch places data';
        throw { status, message };
    }
};

/**
 * 🎫 Асинхронная функция для получения данных бронирований (bookings).
 * @param token Токен авторизации.
 */
export async function fetchBookings(token: string) {
    if (!API_BASE) throw { status: 500, message: "API_BASE environment variable is missing." };
    
    try {
        const api = createApiInstance(token);
        // Запрос будет выполнен по адресу: https://api.bandu.uz/api/v1/bookings
        const res = await api.get('bookings');
        return res.data || [];
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Failed to fetch bookings data';
        throw { status, message };
    }
};