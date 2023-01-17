import { Fragment } from 'react';
import { MARCAS, YEARS, PLANES } from '../constants';
import useCotizador from '../hooks/useCotizador';
import Error from './Error';

const Formulario = () => {
  const { datos, handleChangeDatos, error, setError, cotizarSeguro } =
    useCotizador();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    // Object es un objeto nativo de javascript que nos permite acceder a las propiedades de un objeto
    // Object.values(datos) es un array con los valores de los campos del formulario
    if (Object.values(datos).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // si todo se valida correctamente se borra el mensaje de error
    setError('');

    // cotizar seguro
    cotizarSeguro();
  };

  return (
    <>
      {error && <Error />}
      <form action='' onSubmit={handleSubmit}>
        <div className='my-5'>
          <label
            htmlFor=''
            className='block mb-3 font-bold text-gray-400 uppercase'
          >
            Marca
          </label>
          <select
            onChange={(e) => handleChangeDatos(e)}
            value={datos.marca}
            name='marca'
            className='w-full p-3 bg-white border border-gray-200'
          >
            <option value=''>-- Seleccione marca --</option>
            {MARCAS.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className='my-5'>
          <label
            htmlFor=''
            className='block mb-3 font-bold text-gray-400 uppercase'
          >
            Año
          </label>
          <select
            name='year'
            onChange={(e) => handleChangeDatos(e)}
            value={datos.year}
            className='w-full p-3 bg-white border border-gray-200'
          >
            <option value=''>-- Seleccione año --</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className='my-5'>
          <label
            htmlFor=''
            className='block mb-3 font-bold text-gray-400 uppercase'
          >
            Elige un plan
          </label>
          <div className='flex gap-3 items-center'>
            {PLANES.map((plan) => (
              // Frament es usado para agrupar elementos sin necesidad de crear un div
              <Fragment key={plan.id}>
                <label>{plan.nombre}</label>
                <input
                  onChange={(e) => handleChangeDatos(e)}
                  type='radio'
                  name='plan'
                  value={plan.id}
                />
              </Fragment>
            ))}
          </div>
        </div>

        <input
          type='submit'
          value='Cotizar'
          className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold'
        />
      </form>
    </>
  );
};

export default Formulario;
