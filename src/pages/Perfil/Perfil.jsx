import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContex'
import { Link } from 'react-router-dom'
import './Perfil.css'

function Perfil() {

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const deslogearUser = async (e) => {
    e.preventDefault()
    const res = await logout()
    navigate('/')
  }

  return (
    <section>
      <Link className='link_to_inicio' to={'/'}>Inicio</Link>

      <h2 className='user_email'>Email: {user.email}</h2>

      <form onSubmit={deslogearUser}>
        <button className='buton_logout'>Deslogear</button>
      </form>
    </section>
  )
}

export default Perfil