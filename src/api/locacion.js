import axios from "./axios";

export const crearLocacion = (data) => axios.post(`/locaciones/crear/`, data)

export const deleteLocacion = (id) => axios.delete(`/locaciones/eliminar/${id}`)

export const buscarLocaciones = (id) => axios.get(`/locaciones/${id}`)