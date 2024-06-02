import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContex';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Login.css'


function Login() {

  const [prossesLogin, setProssesLogin] = useState(false)

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
    setProssesLogin(true)
    const res = await signin(data)
    setProssesLogin(false)
    navigate('/compras')
  })

  return (
    <div className='main_div_login'>

      <Link className='link_to_inicio' to={'/'}>Inicio</Link>

      <h2 className='title_login'>Login</h2>


      <section>
        <form className='login_form' onSubmit={onSubmit}>

          <input
            placeholder='Email...'
            type="email"
            {...register('email', { required: true })}
            />
          {
            errors.email && (
              <p className='message'>Email requerido</p>
            )
          }

          <input
            placeholder='Contraseña...'
            type="password"
            {...register('password', { required: true })}
            />
          {
            errors.password && (
              <p className='message'>Contraseña requerido</p>
            )
          }

          {
            signinErrors.map((error, i) => (
              <div key={'error' + i}>
                <p className='message'>{error.msg}</p>
              </div>
            ))
          }
          {
            prossesLogin && (
              <p className='message'>Loading...</p>
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