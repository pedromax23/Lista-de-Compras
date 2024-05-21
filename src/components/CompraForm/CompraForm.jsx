import './CompraForm.css'
import { useForm } from 'react-hook-form'


function CompraForm({ agregarCompra }) {

  const { register, handleSubmit, formState: {errors}, reset } = useForm()

  const onSubmit = handleSubmit((data) => {
    if (data.compra.trim()) {
      agregarCompra(data.compra)
      reset()
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="compra">Agregar compra</label>
      <input
        type="text"
        id="compra"
        {...register('compra', {
          required: {
            value: true,
            message: 'El campo esta vacio'
          },
          minLength: {
            value: 2,
            message: 'El campo debe ser mayor a 2 caracteres'
          },
          maxLength: {
            value: 10,
            message: 'El capo debe ser menor o igual a 10 caracteres'
          }
        })}
      />
      {
        errors.compra &&
        <span>{errors.compra.message}</span>
      }
      <button type='submit'>Agregar</button>
    </form>
  )
}

export default CompraForm
