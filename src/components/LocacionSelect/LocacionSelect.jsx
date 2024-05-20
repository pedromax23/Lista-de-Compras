function LocacionSelect({ locaciones, manejarCambioLocacion }) {
    const handleChange = (e) => {
      manejarCambioLocacion(e.target.value)
    }
  
    return (
      <form>
        <select name="locacion" id="locacion" onChange={handleChange}>
          <option value="">Elegir</option>
          {locaciones.map((locacion, id) => (
            <option key={'locacion' + id} value={locacion.nombre}>{locacion.nombre}</option>
          ))}
        </select>
      </form>
    )
  }
  
  export default LocacionSelect
  