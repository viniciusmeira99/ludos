import axios from 'axios';

const baseURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/api'
  : window.location.origin + '/api';

const api = axios.create({
  baseURL,
});

if (process.env.NODE_ENV === 'development') {
  api.interceptors.response.use(
    response => response, 
    (err) => {
      if (err.response && err.response.data && err.response.data.name === 'SequelizeConnectionRefusedError') {
        alert('Não foi possível conectar ao banco.');
      }
      return Promise.reject(err);
    }
  )
}

export default api;
