import axios from 'axios';

const axiosDJ = axios.create({
  baseURL: 'https://dummyjson.com',
});

export default axiosDJ;
