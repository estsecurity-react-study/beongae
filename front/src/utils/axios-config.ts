import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5173/api';
// axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:3030';
// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config: originalRequest,
      response: {
        data: { statusCode, message },
      },
    } = error;

    if (statusCode === 401 && message === 'EXPIRED_TOKEN') {
      try {
        const { data } = await axios.post(`/auth/refresh`);

        if (data) {
          // console.log('originalRequest', originalRequest);
          await axios(originalRequest);
        }
      } catch (err) {
        console.log('Refresh Token Error');
        if (window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      }
    }

    return Promise.reject(error);
  },
);
