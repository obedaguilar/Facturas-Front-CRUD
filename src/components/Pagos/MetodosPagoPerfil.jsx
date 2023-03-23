import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaWindowClose } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import visa from '../../img/vis.jpg';
import NavMenu from '../NavMenu';
import AgregarCardPerfil from './AgregarCardPerfil';
import AgregarMetodoPago from './AgregarMetodoPago';
import UsuarioSuscripcionMensual from './UsuarioSuscripcionMensual';


const MetodosPagoPerfil = () => {


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const { authAction, auth } = useAuth();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);



    useEffect(() => {
        try {
            const fetchCard = async () => {
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                const response = await fetch(`http://localhost:8080/stripe/obtener/payment/?email=${auth.session.email}`, requestOptions)
                const result = await response.json();
                setData(result.cards.data);
                console.log(result.cards.data);
                // console.log(result?.cards?.data[0]?.id)

            }
            fetchCard();
        } catch (error) {
            console.log(error);
        }
    }, []);





    return (
        <main>
            <NavMenu />
            <section className=''>
                <div>
                    <div className='flex justify-start items-center mx-10 my-10 ' >
                        <div className='items-center text-center'><button><FaPlus style={{
                            fontSize: '2rem',
                            color: '#F9A826'
                        }}
                            onClick={() => {
                                setOpen(true);
                                console.log("se abre", handleClose);
                            }}
                        />Agregar Tarjeta</button></div>
                    </div>
                </div>
                <div>
                    {data?.map((item) => (
                        <div key={item.id} className="rounded overflow-hidden shadow m-10">
                            <div className="px-6 py-4 flex items-center">
                                <div className="mx-3 text-center items-center">
                                    <div className='flex flex-row '>
                                        <img src={visa} alt="visa" className="w-10 h-6" />
                                        <div className="text-xl mx-5">...{item?.card?.last4}</div>
                                        <div className="text-sm">
                                            Vence el {item?.card?.exp_month} de {item?.card?.exp_year}
                                        </div>
                                        <button className='mx-10 text-red-500'>Eliminar metodo pago</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {
                    open ?
                        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            className="flex justify-center items-center overflow-y-auto my-8 ">
                            <div className="bg-white rounded-lg p-4  sm:w-1/2 md:w-1/2  lg:w-1/2 justify-center">
                                <div className='flex justify-end'>
                                    <button onClick={handleClose} className="text-right "><FaWindowClose /></button>
                                </div>
                                <div className=''>
                                    <div>
                                        <div className='text-center text-2xl'>Agregar Tarjeta</div>
                                        <AgregarCardPerfil />
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        : null
                }
            </section>
        </main>
    )
}

export default MetodosPagoPerfil