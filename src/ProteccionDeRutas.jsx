import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContex"

function ProteccionDeRutas() {

    const { loadig, isAuthenticated } = useAuth()

    if(loadig) return <h1>Loadig ...</h1>
    if (!loadig && !isAuthenticated) return <Navigate to={'/login'} replace />

    return (
        <Outlet />
    )
}

export default ProteccionDeRutas