import axios from "axios";

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/latest`, {
      params: {
        apikey: API_KEY
      }
    });

    return res.data;
  } catch (error) {
    console.error("Ошибка загрузки новостей:", error.response?.data || error.message);
    throw error;
  }
};
