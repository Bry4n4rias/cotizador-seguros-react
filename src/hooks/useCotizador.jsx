import { useContext } from 'react';
import CotizadorContext from '../context/CotizadorProvider';

const useCotizador = () => {
  // ahora useCotizador es un hook que nos permite usar el contexto de CotizadorProvider
  return useContext(CotizadorContext);
};

export default useCotizador;
