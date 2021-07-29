import axios from 'axios';
const token = JSON.parse(localStorage.getItem('token'));
export const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  // withCredentials: true

});
