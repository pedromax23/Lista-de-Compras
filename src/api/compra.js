import axios from "./axios";

export const crearCompra = (data) => axios.post(`/compras/agregar/`, data)

export const deleteCompra = (id) => axios.delete(`/compras/eliminar/${id}`)

export const buscarCompras = (id) => axios.get(`/compras/?locacion_id=${id}`)