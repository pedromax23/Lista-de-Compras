import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

// Configuración del interceptor para manejar CORS
instance.interceptors.request.use(function (config) {
    // Agregar encabezados para permitir CORS
    config.headers['Access-Control-Allow-Origin'] = '*'; // Esto permite cualquier origen, puedes ajustarlo según tu necesidad
    // También puedes agregar otros encabezados CORS según sea necesario
    return config;
}, function (error) {
    // Si hay errores en la configuración, simplemente devolver el error sin cambios
    return Promise.reject(error);
});

export default instance;