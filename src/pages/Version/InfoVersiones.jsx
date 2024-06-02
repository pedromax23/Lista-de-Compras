import { Link } from 'react-router-dom'
import './InfoVersiones.css'

function InfoVersiones() {
    return (
        <section className='info_section'>
            <div className='boton_volver'>
                <Link className='volver' to={'/'}>Volver</Link>
            </div>
            <div className='informacion'>

                <p>
                    LLego la versión 1.1 con el sistema de login y su nuevo diseño!!
                </p>

                <h4>Información proxima versión</h4>
                <p>En la versión 1.2 agregare las funciones: </p>
                <ul>
                    <li>Boton para limpiar toda la lista de compras</li>
                    <li>Grupos</li>
                    <li>En el inicio una seccion de comentarios para que puedan escribir y dejar opiniones y recomendaciones para mejorar la pagina</li>
                    <li>Mejoras en el diseño responsive</li>
                </ul>
            </div>
        </section>
    )
}

export default InfoVersiones