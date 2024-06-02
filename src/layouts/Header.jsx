import { useAuth } from '../context/AuthContex'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {

    const { user, loadig } = useAuth()

    // Contenido dinamico
    let contenido = <div className='link_user'>
        {
            loadig ? (<p>Cargando ...</p>) : user ?
                (<Link to={'/perfil'}>Perfil</Link>)
                : (
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </>
                )
        }
    </div>
    // Fin del contenido

    return (
        <header className='main_header'>
            <menu className='header_menu'>
                <div className='link_compras'>
                    <Link to={'/compras'}>Mis compras</Link>
                    <Link to={'/entrar-grupo'}>Entrar a un grupo</Link>
                </div>
                {contenido}
            </menu>
        </header>
    )
}

export default Header