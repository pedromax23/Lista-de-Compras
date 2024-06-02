import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './Login.css'


function Login() {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (data) => {
    const res = signin(data)
    navigate('/compras')
  })

  return (
    <div className='main_div_login'>

      <Link className='link_to_inicio' to={'/'}>Inicio</Link>

      <h2 className='title_login'>Login</h2>

      {
        signinErrors.map((error, i) => (
          <div key={'error' + i}>
            {error.msg}
          </div>
        ))
      }

      <section>
        <form className='login_form' onSubmit={onSubmit}>

          <input
            placeholder='Email...'
            type="email"
            {...register('email', { required: true })}
          />
          {
            errors.email && (
              <p>Email requerido</p>
            )
          }

          <input
            placeholder='Contraseña...'
            type="password"
            {...register('password', { required: true })}
          />
          {
            errors.password && (
              <p>Contraseña requerido</p>
            )
          }

          <button className='boton_login'>
            Login
          </button>
        </form>
      </section>

      <p className='link_to_register'>
        Si aun no tienes una cuenta <Link to={'/register'}>Register</Link>
      </p>
    </div>
  )
}

export default Login