import axios from 'axios';
import Cookies from "js-cookie";


const Axios = axios.create({
  // baseURL: 'http://192.168.68.115:8000/api', // Replace with your API URL
  // baseURL: "http://192.168.68.106:8000/api", 
  baseURL: "https://demo2.leapxads.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});



// Intercept request to add token
Axios.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Get token from cookies
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
});

export default Axios;


