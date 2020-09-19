import Axios from 'axios';

export const request = Axios.create({
  baseURL: '/',
  // baseURL: 'http://localhost:9090/',
});
