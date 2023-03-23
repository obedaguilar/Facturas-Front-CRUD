import { Backdrop } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Back from '../ButtonBack';
import Loading from '../Loading';

const AgregarMetodoPago = () => {


    const [loading, setLoading] = useState(false);
    const { authAction, auth } = useAuth()
    const stripePay = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const interval = "month";


    const handleSubmit = async (event) => {
        event.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripePay.createPaymentMethod({
            type: 'card',
            card: cardElement,

        });
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            try {
                //Enviamos el id del metodo de pago a nuestro backend y el cliente lo guarda en la base de datos
                var formdata = new FormData();
                formdata.append("email", auth.session.email);
                formdata.append("id", paymentMethod.id);
                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };
                const response = await fetch("http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/stripe/add/payment", requestOptions)
                const data = await response.json();
                console.log(data);
                if (data) {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigate(`/hosting/pago?id=${paymentMethod.id}&&interval=${interval}`)
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Back />
            <div className="flex justify-center items-center h-screen ">
                <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl text-center font-semibold">Pago con tarjeta</h2>
                    <p className="text-center text-gray-500 mb-5">Ingrese los datos de su tarjeta para completar la compra</p>
                    <label className="text-gray-700 text-sm font-bold" htmlFor="card-element">
                        Agregar nueva tarjeta:
                    </label>
                    <form className="container flex-row bg-metal rounded p-6 border-sky-500">
                        <CardElement />
                    </form>
                    <div className='flex justify-center my-6'>
                        <button onClick={handleSubmit} className="bg-green-midnight text-white px-4 py-2 rounded hover:bg-green-400 items-center">Proceder al pago</button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default AgregarMetodoPago