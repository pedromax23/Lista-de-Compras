import { useEffect, useState } from 'react'
import './App.css'
import LocacionForm from './components/LocacionForm/LocacionForm'
import LocacionSelect from './components/LocacionSelect/LocacionSelect'
import CompraForm from './components/CompraForm/CompraForm'
import CompraList from './components/CompraList/CompraList'

import { Link } from 'react-router-dom'

function App() {
  const [locaciones, setLocaciones] = useState([])
  const [locacion, setLocacion] = useState({})
  const [compras, setCompras] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/locaciones')
      .then(res => res.json())
      .then(data => setLocaciones(data.data))
      .catch(error => console.error('Error al obtener locaciones:', error))
  }, [])

  useEffect(() => {
    if (locacion && locacion.id) {
      fetch(`http://localhost:4000/compras?locacion_id=${locacion.id}`)
        .then(res => res.json())
        .then(data => setCompras(data.data))
        .catch(error => console.error('Error al obtener compras:', error))
    }
  }, [locacion])

  const agregarLocacion = async (newLocacion) => {
    try {
      const response = await fetch('http://localhost:4000/locaciones/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: newLocacion }),
      })

      if (response.ok) {
        const data = await response.json()
        setLocaciones(prev => [...prev, data.data])
      } else {
        console.error('Error al agregar locación:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al agregar locación:', error)
    }
  }

  const manejarCambioLocacion = (locacionNombre) => {
    const locacionSeleccionada = locaciones.find(loc => loc.nombre === locacionNombre)
    setLocacion(locacionSeleccionada || {})
  }

  const eliminarLocacion = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/locaciones/eliminar', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setLocaciones(prev => prev.filter(loc => loc.id !== id))
        setLocacion({})
      } else {
        console.error('Error al eliminar locación:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al eliminar locación:', error)
    }
  }

  const agregarCompra = async (nombre) => {
    try {
      const response = await fetch('http://localhost:4000/compras/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre, locacion_id: locacion.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setCompras(prev => [...prev, data.data])
      } else {
        console.error('Error al agregar compra:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al agregar compra:', error)
    }
  }

  const eliminarCompra = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/compras/eliminar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      })

      if (response.ok) {
        setCompras(prev => prev.filter(compra => compra.id !== id))
      } else {
        console.error('Error al eliminar compra:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al eliminar compra:', error)
    }
  }

  return (
    <>
      <div className='main_div'>

        <h1 className='titulo'>Anota tus compras</h1>

        <LocacionForm locaciones={locaciones} agregarLocacion={agregarLocacion} />
        <LocacionSelect locaciones={locaciones} locacion={locacion} manejarCambioLocacion={manejarCambioLocacion} />
        <section className='section_info'>
          {locacion && locacion.nombre &&
            <>
              <div className='nombre_locacion'>
                <h3>{locacion.nombre}</h3>
                <button onClick={() => eliminarLocacion(locacion.id)}>Eliminar Locación</button>
              </div>
              <CompraForm agregarCompra={agregarCompra} />
              <CompraList compras={compras} eliminarCompra={eliminarCompra} />
            </>
          }
        </section>
      </div>

      <Link className='info_version' to={'/info-V1.1'}>Informacion de la proxima versión</Link>
    </>
  )
}

export default App
