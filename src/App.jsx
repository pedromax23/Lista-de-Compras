import { useEffect, useState } from 'react'
import './App.css'
import LocacionForm from './components/LocacionForm/LocacionForm'
import LocacionSelect from './components/LocacionSelect/LocacionSelect'
import CompraForm from './components/CompraForm/CompraForm'
import CompraList from './components/CompraList/CompraList'

function App() {
  const [locaciones, setLocaciones] = useState([])
  const [locacion, setLocacion] = useState('')
  const [compras, setCompras] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/locaciones').then(res => res.json())
      .then(data => setLocaciones(data.data))
  }, [locacion])

  useEffect(() => {
    fetch('http://localhost:4000/compras?locacion_id=' + locacion.id).then(res => res.json())
      .then(data => setCompras(data.data))
  }, [locacion, compras])

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
        setLocacion(data.data)
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
    const eliminarLocacion = await fetch('http://localhost:4000/locaciones/eliminar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
    setLocacion('')
  }

  const agregarCompra = async (compra) => {
    try {
      const response = await fetch('http://localhost:4000/compras/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: compra, locacion_id: locacion.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setCompras([...compras])
      } else {
        console.error('Error al agregar compra:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al agregar compra:', error)
    }
  }

  const eliminarCompra = async (id) => {
    const eliminarCompra = await fetch('http://localhost:4000/compras/eliminar?id=' + id).then(res => res.json())

    setCompras([...compras])
  }



  return (
    <>
      <LocacionForm agregarLocacion={agregarLocacion} />
      <LocacionSelect locaciones={locaciones} locacion={locacion} manejarCambioLocacion={manejarCambioLocacion} />
      <section className='section_info'>
        {locacion.nombre &&
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
    </>
  )
}

export default App