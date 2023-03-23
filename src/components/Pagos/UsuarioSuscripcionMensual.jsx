import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import AgregarMetodoPago from './AgregarMetodoPago';


const stripePromise = loadStripe('pk_test_51McBtgIYEen6sDjx9OCZs2CirnMuMDqIGwgkQyyqY3Py5xxhsi0w6DZxivtNDlKLiQIwyOC5XBSG6951ywukHEF700ypL3QPkV');


const UsuarioSuscripcionMensual = () => {
  // const stripe = useStripe();
  // const elements = useElements();


  const { authAction, auth } = useAuth()


  return (
    <Elements stripe={stripePromise} >
      <AgregarMetodoPago />
    </Elements>
  );
}

export default UsuarioSuscripcionMensual