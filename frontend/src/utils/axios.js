import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://url-shortener-backend-yvyu.onrender.com/v1/',
    withCredentials: true
})

export default axiosInstance;