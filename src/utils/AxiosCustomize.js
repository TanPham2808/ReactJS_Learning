import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://172.31.23.175:8081/',
});

//--------- Middleware Request & Reponse ---------//
//------------------Interceptors------------------//

// Customize request trước khi gửi đi
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Customize response sau khi nhận về từ Server trước khi bindding lên component
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
        ? error.response.data : Promise.reject(error);
});

export default instance;