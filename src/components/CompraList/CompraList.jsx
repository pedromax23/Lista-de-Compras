import './CompraList.css'

function CompraList({ compras, eliminarCompra }) {
  
  let contenido = compras.length > 0 ? <ul className='lista_compras'>

    {compras.map((compra, id) => (
      <li key={'compra' + id}>
        {compra.nombre || 'Compra sin nombre'}
        <button onClick={() => eliminarCompra(compra.id)}>Eliminar</button>
      </li>
    ))}
  </ul> : <></>

  return (
    <>
      {contenido}
    </>
  )
}

export default CompraList
