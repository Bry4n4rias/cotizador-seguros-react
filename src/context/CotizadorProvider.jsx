import { createContext, useState } from 'react';
import {
  getYearDifference,
  calculateBrand,
  getPlan,
  formatCurrency,
} from '../helpers';

// Creamos el contexto para poder usarlo en cualquier componente de la app sin necesidad de pasar props
const CotizadorContext = createContext();

// Creamos el provider para poder usar el contexto en cualquier componente de la app
// toodo lo que este dentro del provider va a tener acceso al contexto creado
const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: '',
  });

  const [error, setError] = useState('');
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      // ...datos es para que no se pierdan los datos que ya estan en el state
      ...datos,
      // e.target.name es el nombre del input que se esta modificando
      // e.target.value es el valor del input que se esta modificando
      [e.target.name]: e.target.value,
      // esto es lo mismo que hacer esto: marca: e.target.value o year: e.target.value o plan: e.target.value
      // cada vez que se modifique un input o el select se va a actualizar el state
    });
  };
  // children es todo lo que este dentro del provider, osea todos los componentes hijos

  const cotizarSeguro = () => {
    // base
    let resultado = 2000000;

    // obtener los años de antiguedad
    const diferencia = getYearDifference(datos.year);

    // por cada año hay que restar el 3%
    // es lo mismo que hacer resultado = resultado - ((diferencia * 3) * resultado) / 100;
    resultado -= (diferencia * 3 * resultado) / 100;

    // americano 15%
    // europeo 30%
    // asiatico 5%
    resultado *= calculateBrand(datos.marca);

    // basico aumenta 20%
    // completo 50%
    resultado *= getPlan(datos.plan);

    // formatear el resultado
    resultado = formatCurrency(resultado);

    // ponemos el spiner de carga
    setCargando(true);

    // despue de 3 segundos se muestra el resultado
    // y se quita el spiner de carga
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 3000);
  };

  return (
    // El provider es el que va a proveer el contexto a los componentes hijos
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
