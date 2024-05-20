import { useState } from 'react'
import './LocacionForm.css'

function LocacionForm({ agregarLocacion }) {
  const [newLocacion, setNewLocacion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newLocacion.trim()) {
      agregarLocacion(newLocacion)
      setNewLocacion('')
    }
  }

  return (
    <form className='main_form' onSubmit={handleSubmit}>
      <label place='Casa Cordoba' htmlFor="locacion">Agregar Locación</label>
      <input
        type="text"
        name="locacion"
        id="locacion"
        value={newLocacion}
        onChange={(e) => setNewLocacion(e.target.value)}
        placeholder='Casa Cordoba...'
      />
      <button type='submit'>Agregar</button>
    </form>
  )
}

export default LocacionForm
