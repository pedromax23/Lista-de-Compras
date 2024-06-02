import { useEffect, useState } from 'react'
import './Compras.css'
import LocacionForm from '../../components/LocacionForm/LocacionForm'
import LocacionSelect from '../../components/LocacionSelect/LocacionSelect'
import CompraForm from '../../components/CompraForm/CompraForm'
import CompraList from '../../components/CompraList/CompraList'
import { useAuth } from '../../context/AuthContex'

import { crearLocacion, buscarLocaciones, deleteLocacion } from '../../api/locacion.js'
import { crearCompra, buscarCompras, deleteCompra } from '../../api/compra.js'

import { Link } from 'react-router-dom'
import Header from '../../layouts/Header.jsx'
import EliminarLocacion from '../../components/EliminarFromLocacion/EliminarLocacion.jsx'


function Inicio() {
  const [locaciones, setLocaciones] = useState([])
  const [locacion, setLocacion] = useState({})
  const [compras, setCompras] = useState([])
  const [error, setError] = useState([])

  const { user } = useAuth()
  const { id: idUsuario } = user

  const API_URL = import.meta.env.VITE_API_URL_LOCAL

  // Buscando locaciones
  useEffect(() => {
    async function findLocation(id) {
      try {
        const res = await buscarLocaciones(id)
        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setLocaciones(res.data.data)
      } catch (error) {
        console.error('Error al obtener locaciones:', error);
        alert('Hubo un problema al obtener las locaciones. Por favor, intenta nuevamente más tarde.');
      }
      return;
    }
    findLocation(idUsuario)
  }, []);

  // Buscando compras con id de la locacion
  useEffect(() => {
    async function findBuys(id) {
      try {
        const res = await buscarCompras(id)
        setCompras(res.data.data)

      } catch (error) {
        console.error('Error al obtener compras:', error)
      }

    }
    if (locacion && locacion.id) {
      findBuys(locacion.id)
    }
  }, [locacion])

  // Creando una locacion
  const agregarLocacion = async (newLocacion) => {
    try {

      // Obejto con datos
      const nuevaLocacion = {
        nombre: newLocacion,
        usuario_id: idUsuario
      }

      const res = await crearLocacion(nuevaLocacion)
      if (res.status === 201) {
        console.log(res)
        setLocaciones([...locaciones, res.data.data])
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

  // Eliminando una locacion
  const eliminarLocacion = async (id) => {
    try {
      const res = await deleteLocacion(id)
      if (res.status === 200) {
        setLocaciones(prev => prev.filter(loc => loc.id !== id))
        setLocacion({})
      } else {
        console.error('Error al eliminar locación:', res.statusText)
      }
    } catch (error) {
      setError(error.response.data)
      console.error('Error de red al eliminar locación:', error)
    }
  }

  // Agregando una compra a la locacion
  const agregarCompra = async (nombre) => {
    try {

      const nuevaCompra = {
        nombre,
        locacion_id: locacion.id,
        usuario_id: idUsuario
      }

      const res = await crearCompra(nuevaCompra)
      if (res.status === 201) {
        setCompras([...compras, res.data.data])
      } else {
        console.error('Error al agregar compra:', response.statusText)
      }
    } catch (error) {
      console.error('Error de red al agregar compra:', error)
    }
  }

  // Eliminando una compra
  const eliminarCompra = async (id) => {
    try {
      const res = await deleteCompra(id)
      if (response.status === 200) {
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
      <Header />
      <section className='main_div'>
        <LocacionSelect locaciones={locaciones} locacion={locacion} manejarCambioLocacion={manejarCambioLocacion} />
        <LocacionForm locaciones={locaciones} agregarLocacion={agregarLocacion} />
        {locacion && locacion.nombre ?
          <section className='section_info'>
            <>
              <EliminarLocacion error={error} eliminarLocacion={eliminarLocacion} locacion={locacion} />
              <CompraForm agregarCompra={agregarCompra} />
              <CompraList compras={compras} eliminarCompra={eliminarCompra} />
            </>
          </section>
          :
          <></>
        }
      </section>

      <Link className='info_version' to={'/info-V1.1'}>Informacion de la proxima versión</Link>
    </>
  )
}

export default Inicio