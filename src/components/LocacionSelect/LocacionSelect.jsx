function LocacionSelect({ locaciones, manejarCambioLocacion, locacion }) {
  const handleChange = (e) => {
    manejarCambioLocacion(e.target.value)
  }

  return (
    <form>
      <select value={locacion ? locacion.nombre : ''} name="locacion" id="locacion" onChange={handleChange}>
        <option value="">Elegir</option>
        {locaciones.map((loc, id) => (
          <option key={'locacion' + id} value={loc.nombre}>{loc.nombre}</option>
        ))}
      </select>
    </form>
  )
}

export default LocacionSelect
