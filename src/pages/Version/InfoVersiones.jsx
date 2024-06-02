import { Link } from 'react-router-dom'
import './InfoVersiones.css'

function InfoVersiones() {
    return (
        <section className='info_section'>
            <div className='boton_volver'>
                <Link className='volver' to={'/'}>Volver</Link>
            </div>
            <div className='informacion'>
                <h4>Información proxima versión</h4>
                <p>En la versión 1.1 me agregaran las funciones: </p>
                <ul>
                    <li>Boton para limpiar toda la lista de compras</li>
                </ul>

                <h4>Proximas actualizaciones</h4>
                <p>En las proximas versiones: </p>
                <ul>
                    <li>Login de cuentas</li>
                    <li>Compras compartidas</li>
                </ul>
            </div>
        </section>
    )
}

export default InfoVersiones