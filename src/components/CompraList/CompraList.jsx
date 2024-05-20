import './CompraList.css'

function CompraList({ compras, eliminarCompra }) {
  if (!compras || !Array.isArray(compras)) {
    return <p>No hay compras disponibles.</p>;
  }

  return (
    <ul>
      {compras.map((compra, id) => (
        <li key={'compra' + id}>
          {compra.nombre || 'Compra sin nombre'}
          <button onClick={() => eliminarCompra(compra.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}

export default CompraList
