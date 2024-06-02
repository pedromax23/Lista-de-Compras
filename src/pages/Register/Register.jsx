import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContex'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './Register.css'

function Register() {

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='main_div_register'>

            <Link className='link_to_inicio' to={'/'}>Inicio</Link>

            <h2 className='register_title'>Register</h2>

            <form className='register_form' onSubmit={onSubmit}>

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
                    registerErrors.map((error, i) => (
                        <div key={'error' + i}>
                            <p className='message'>{error.msg}</p>
                        </div>
                    ))
                }
                <button className='register_buton'>
                    Register
                </button>
            </form>

            <p className='link_to_login'>
                Si ya tienes una cuenta <Link to={'/login'}>Login</Link>
            </p>
        </div>
    )
}

export default Register