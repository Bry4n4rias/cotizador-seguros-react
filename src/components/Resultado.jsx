import useCotizador from '../hooks/useCotizador';
import { useCallback, useRef, useMemo } from 'react';
import { MARCAS, PLANES } from '../constants';

const Resultado = () => {
  const { resultado, datos } = useCotizador();
  const { marca, year, plan } = datos;
  // creamos un ref para guardar el valor del año y que no se vuelva a renderizar el componente cada vez q se cambie el valor del año
  // en este caso no podemos usar useCallback ya q no es una funcion, es un valor y no se puede memorizar un valor
  const yearRef = useRef(year);

  // filtramos el array de marcas para obtener el nombre de la marca
  // segun el id que se encuentra en el state

  // USANDO CALLBACK //
  // const nombreMarca = useCallback(
  //   MARCAS.filter((m) => m.id === Number(marca))[0],
  //   [resultado]
  // );

  // useCallback y useMemo son un hook que nos permite memorizar una funcion para que no se vuelva a ejecutar
  // si las dependencias no cambian osea, si el resultado no cambia no se vuelve a ejecutar la funcion y no se vuelve a renderizar el componente
  // en caso de q cambiemos la marca en el formulario, no re renderizara el componente hasta q le demos click al boton de cotizar

  // USANDO MEMO //
  const nombreMarca = useMemo(
    () => MARCAS.filter((m) => m.id === Number(marca))[0],
    [resultado]
  );

  const nombrePlan = useCallback(
    PLANES.filter((p) => p.id === Number(plan))[0],
    [resultado]
  );

  if (resultado === 0) return null;

  return (
    <div className='bg-gray-100 text-center mt-5 p-5 shadow'>
      <h2 className='text-gray-600 font-black text-3xl'>Resumen</h2>

      <p className='my-2'>
        <span className='font-bold'>Marca: </span>
        {nombreMarca.nombre}
      </p>

      <p className='my-2'>
        <span className='font-bold'>Plan: </span>
        {nombrePlan.nombre}
      </p>

      <p className='my-2'>
        <span className='font-bold'>Modelo del carro: </span>
        {yearRef.current}
      </p>

      <p className='my-2 text-2xl'>
        <span className='font-bold'>Total cotizacion: </span>
        {resultado}
      </p>
    </div>
  );
};

export default Resultado;
