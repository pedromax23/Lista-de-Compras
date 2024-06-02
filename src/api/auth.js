import axios from "./axios";

export const registerRequest = (user) => axios.post(`/usuario/register`, user);

export const loginRequest = (user) => axios.post(`/usuario/login`, user)

export const verityTokenRequest = () => axios.get(`/usuario/verity-token`)

export const logoutRequest = () => axios.get(`/usuario/logout`)