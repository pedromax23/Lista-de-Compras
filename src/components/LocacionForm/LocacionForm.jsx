import { useForm } from 'react-hook-form'
import './LocacionForm.css'

function LocacionForm({ agregarLocacion, locaciones }) {
  const { register, handleSubmit, formState: {errors}, reset } = useForm()

  const onSubmit = handleSubmit((data) => {
    if (data.nombre.trim()) {
      agregarLocacion(data.nombre)
      reset()
    }
  })

  const validateLocacionExiste = (value) => {
    const locacionExiste = locaciones.some(locacion => Object.values(locacion).includes(value));
    return locacionExiste ? 'Esta locación ya existe' : true
  }

  return (
    <form className='main_form' onSubmit={onSubmit}>
      <label place='Casa Cordoba' htmlFor="locacion">Agregar Locación</label>
      <input
        type="text"
        id="locacion"
        placeholder='Casa Cordoba...'
        {...register('nombre', {
          required: {
            value: true,
            message: 'El nombre esta vacio'
          },
          minLength: {
            value: 2,
            message: 'El nombre de la locación debe ser mayor a 2 caracteres'
          },
          maxLength: {
            value: 10,
            message: 'El nombre de la locación debe ser menor o igual a 10 caracteres'
          },
          validate: validateLocacionExiste
        })}
      />
      {
        errors.nombre &&
        <span>{errors.nombre.message}</span>
      }
      <button type='submit'>Agregar</button>
    </form>
  )
}

export default LocacionForm
