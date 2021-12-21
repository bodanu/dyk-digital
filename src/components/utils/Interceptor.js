import axios from "axios";

const instance =  axios.create();

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// instance.defaults.headers.common['X-Forwarded'] = '67eb-5-15-27-0.ngrok.io';
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.withCredentials = true;



const responseSuccessHandler = response => {
    return response;
};

const responseErrorHandler = error => {
    if (error.response.status === 401) {
        console.log(error.response.data.message)
        // Aici vine logica de redirect to login
        // Nu merge useHHistory() :(
    }
    if (error.response.status === 422) {
        console.log(error.response.data.message)
        // Aici vine logica de redirect to login
        // Nu merge useHHistory() :(
    }
    return Promise.reject(error);
}

instance.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
);

export default instance;