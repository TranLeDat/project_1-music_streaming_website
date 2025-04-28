import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://thingproxy.freeboard.io/fetch/https://api.deezer.com',
    headers: {
        'Content-Type' : 'application/json'
    }
})


// Request interceptor
axiosClient.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);
  
// Response interceptor
axiosClient.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return Promise.reject(error);
    }
);

export default axiosClient;