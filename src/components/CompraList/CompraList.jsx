import './CompraList.css'

function CompraList({ compras, eliminarCompra }) {
    return (
        <ul>
            {compras.map((compra, id) => (
                <li key={'compra' + id}>
                    {compra}
                    <button onClick={() => eliminarCompra(id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    )
}

export default CompraList