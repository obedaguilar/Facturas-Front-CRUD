import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import { Modal } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { types } from '../../models/typeAuth';
import { useNavigate } from 'react-router-dom';

const CancelarSuscripcion = () => {

    const { authAction, auth } = useAuth();
    const [dataSubscripcion, setDataSubscripcion] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();





    useEffect(() => {
        const obtenerSubscripcion = async () => {

            // var myHeaders = new Headers();
            // myHeaders.append("Authorization", auth.session.api_token);

            const requestOptions = {
                method: 'GET',
                // headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch(`http://localhost:8080/stripe/obtener/subscription/?customer_email=${auth.session.email}`, requestOptions);
            if (response.status === 401) {
                const action = {
                    type: types.logout,
                    payload: {
                    }
                }
                authAction(action)
            }
            const resultSub = await response.json();
            setDataSubscripcion(resultSub)
            console.log(resultSub);
        }
        obtenerSubscripcion();
    }, [])

    const handleCancelarSuscripcion  = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:8080/stripe/cancel/subscription/?email=${auth.session.email}&id=${dataSubscripcion?.allSubscription?.data[0]?.id}`, requestOptions)
        const result = await response.json();
        console.log(result);
    }




    return (
        <main>
            <div>Hola {auth.session.nombre}</div>
            <div>Subscripcion: {dataSubscripcion?.allSubscription?.data[0]?.status}</div>
            <div>Comenzó la suscripción el  {new Date((dataSubscripcion?.allSubscription?.data[0]?.current_period_start) * 1000).toLocaleDateString()}</div>
            <div>Termina la suscripción el  {new Date((dataSubscripcion?.allSubscription?.data[0]?.current_period_end) * 1000).toLocaleDateString()}</div>
            <div>Costo de la suscripción: {dataSubscripcion?.allSubscription?.data[0]?.plan?.amount}</div>
            <div>Costo de la suscripción: {dataSubscripcion?.allSubscription?.data[0]?.plan?.currency}</div>
            <div>Costo de la suscripción: {dataSubscripcion?.allSubscription?.data[0]?.plan?.interval}</div>
            <Button onClick={
                () => setOpen(true)
            }>Cancelar suscripcion</Button>
            {
                open && (
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="flex flex-col justify-center items-center h-screen bg-white">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-2xl font-bold">¿Estás seguro de que quieres cancelar tu suscripción?</div>
                                <div className="text-xl">Si cancelas tu suscripción, no podrás acceder a los beneficios de la misma.</div>
                                <div className="flex justify-center items-center">
                                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                                    <Button onClick={
                                        () => {
                                            setOpen(false);
                                            handleCancelarSuscripcion();
                                            navigate('/suscripcion')
                                        }  
                                    }>Confirmar</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </main>
    )
}

export default CancelarSuscripcion