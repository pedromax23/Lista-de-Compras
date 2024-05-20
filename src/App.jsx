import { useState } from 'react'
import './App.css'
import LocacionForm from './components/LocacionForm/LocacionForm'
import LocacionSelect from './components/LocacionSelect/LocacionSelect'
import CompraForm from './components/CompraForm/CompraForm'
import CompraList from './components/CompraList/CompraList'

function App() {
  const [locaciones, setLocaciones] = useState([])
  const [locacion, setLocacion] = useState({})
  const [compra, setCompra] = useState('')

  const agregarLocacion = (newLocacion) => {
    const nuevaLocacion = {
      nombre: newLocacion,
      compras: []
    }
    setLocaciones([...locaciones, nuevaLocacion])
  }

  const manejarCambioLocacion = (locacionNombre) => {
    const locacionSeleccionada = locaciones.find(loc => loc.nombre === locacionNombre)
    setLocacion(locacionSeleccionada || {})
  }

  const agregarCompra = (compra) => {
    if (locacion.nombre) {
      const locacionActualizada = {
        ...locacion,
        compras: [...locacion.compras, compra]
      }

      const nuevasLocaciones = locaciones.map(loc =>
        loc.nombre === locacion.nombre ? locacionActualizada : loc
      )

      setLocaciones(nuevasLocaciones)
      setLocacion(locacionActualizada)
    }
  }

  const eliminarCompra = (indice) => {
    if (locacion.nombre) {
      const locacionActualizada = {
        ...locacion,
        compras: locacion.compras.filter((_, id) => id !== indice)
      }

      const nuevasLocaciones = locaciones.map(loc =>
        loc.nombre === locacion.nombre ? locacionActualizada : loc
      )

      setLocaciones(nuevasLocaciones)
      setLocacion(locacionActualizada)
    }
  }

  return (
    <>
      <LocacionForm agregarLocacion={agregarLocacion} />
      <LocacionSelect locaciones={locaciones} manejarCambioLocacion={manejarCambioLocacion} />
      <section className='section_info'>
        <h3 className='nombre_locacion'>{locacion.nombre}</h3>
        {locacion.compras && 
        <>
          <CompraForm compra={compra} setCompra={setCompra} agregarCompra={agregarCompra} />
          <CompraList compras={locacion.compras} eliminarCompra={eliminarCompra} />
        </>
        }
      </section>
    </>
  )
}

export default App