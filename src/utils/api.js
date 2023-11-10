// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://newsdata.io/api', // replace with your API endpoint
});

export default api;
