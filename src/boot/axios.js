import axios from 'axios'
import { LocalStorage } from 'quasar'

const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    Accept: 'application/json',
    'Content-Type': 'application/json'
})
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = `Bearer ${LocalStorage.getItem("token")}`
    return config;
});

export default ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }