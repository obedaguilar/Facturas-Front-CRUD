import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import '../../styles/MyCheckSucces.css';

const RegistroMetodoPago = ({ formDataPayment, setFormDataPayment }) => {


    const [paymentMethod, setPaymentMethod] = useState('')
    const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)




    const navigate = useNavigate();


    const handleChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(paymentMethod)
        // navigate('/login')
        setIsSuccessSubmit(true)

    };


    return (
        <div className='h-[324px]'>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-center my-2 w-2/5 m-auto shadow-md py-2 "
                style={
                    { display: isSuccessSubmit ? 'none' : 'flex' }
                }
            >
                <div className='w-3/5 h-8 justify-center flex flex-wrap'>
                    {/* <label htmlFor="cardHolder">Nombre del titular de la tarjeta:</label> */}
                    <input
                        type="text"
                        id="cardHolder"
                        value={formDataPayment.nombreTitular}
                        onChange={(e) => setFormDataPayment(...formDataPayment, e.target.value)}
                        className='w-full rounded-md h-8'
                        placeholder='Nombre del titular de la tarjeta'
                    />
                </div>
                <div className=' w-3/5 h-8 justify-center flex flex-wrap my-1 py-0'>
                    {/* <label htmlFor="cardNumber">Núm. Tarjeta:</label> */}
                    <input
                        type="text"
                        id="cardNumber"
                        value={formDataPayment.numeroTarjeta}
                        onChange={(e) => setFormDataPayment(...formDataPayment, e.target.value)}
                        className='w-full my-1 rounded-md h-8'
                        placeholder='Núm. Tarjeta'
                    />
                </div>

                <div className=' w-3/5 h-8 justify-center flex flex-wrap my-1 py-0 '>
                    {/* <label htmlFor="expiryDate">Fecha de expiración:</label> */}
                    <input
                        type="text"
                        id="expiryDate"
                        value={formDataPayment.fechaExpiracion}
                        onChange={(e) => setFormDataPayment(...formDataPayment, e.target.value)}
                        className='w-full my-1 rounded-md h-8'
                        placeholder='MM/AA'
                    />
                </div>
                <div className=' w-3/5 h-8 justify-center flex flex-wrap my-1 py-0'>
                    {/* <label htmlFor="securityCode">CVV(código de seguridad):</label> */}
                    <input
                        type="text"
                        id="securityCode"
                        value={formDataPayment.cvv}
                        onChange={(e) => setFormDataPayment(...formDataPayment, e.target.value)}
                        className='w-full my-1  rounded-md h-8'
                        placeholder='CVV'
                    />
                </div>
                <div className=' rounded-md text-white text-lx w-3/5 flex justify-center my-6'>
                    <button type="submit" className='w-3/5 bg-indigo-500 rounded-md h-8' >Guardar Tarjeta</button>
                </div>
            </form>
            {
                isSuccessSubmit && (
                    <div className=' rounded-m w-[362px] text-black text-lx  mx-auto flex justify-center shadow-md'>

                        <div className='text-center'>
                            <h1 className='text-2xl'>¡Tarjeta guardada con éxito!</h1>
                            <p className='text-sm'>Puedes volver a tu perfil</p>
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>

                    </div>

                )
            }
        </div >






    )
}

export default RegistroMetodoPago