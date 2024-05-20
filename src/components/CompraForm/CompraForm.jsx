import { useState } from 'react'
import './CompraForm.css'


function CompraForm({ agregarCompra }) {
  const [compra, setCompra] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (compra.trim()) {
      agregarCompra(compra)
      setCompra('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="compra">Agregar compra</label>
      <input
        type="text"
        name="compra"
        id="compra"
        value={compra}
        onChange={(e) => setCompra(e.target.value)}
      />
      <button type='submit'>Agregar</button>
    </form>
  )
}

export default CompraForm
