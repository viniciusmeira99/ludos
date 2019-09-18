import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/api'
  : window.location.origin + '/api';

const api = axios.create({
  baseURL,
});

export default api;
