import { createContext, useContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verityTokenRequest, logoutRequest } from '../api/auth';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe estar dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loadig, setLoadig] = useState(true)

    const signup = async (user) => {
        try {

            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true)

        } catch (error) {
            setErrors(error.response.data)
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data);
            setIsAuthenticated(true)

        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const logout = async () => {
        try {
            const res = await logoutRequest()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            setErrors(error.response)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            // Comprueba si no hay un token
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoadig(false);
                return setUser(null)
            }

            // Si hay token
            try {

                // Verificar si el token es valido
                const res = await verityTokenRequest(cookies.token)

                // Si el backend no responde un dato
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoadig(false);
                    return;
                }

                // Si el backend si responde un dato
                setIsAuthenticated(true)
                setUser(res.data)
                setLoadig(false);
            
            // Si dio un error
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoadig(false);
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors,
            signin,
            loadig,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
