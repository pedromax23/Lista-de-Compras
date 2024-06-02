import './EliminarLocacion.css'

function EliminarLocacion({ eliminarLocacion, error, locacion }) {
    return (
        <div className='div_nombre_boton'>
            {
                error &&
                error.map((error, id) => (
                    <p className='error_locacion' key={'Error' + id}>{error.msg}</p>
                ))
            }
            <div className='nombre_locacion'>
                <h3>{locacion.nombre}</h3>
                <button className='boton_eliminarLocacion' onClick={() => eliminarLocacion(locacion.id)}>Eliminar Locación</button>
            </div>
        </div>
    )
}

export default EliminarLocacion