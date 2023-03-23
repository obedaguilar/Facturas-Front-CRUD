import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import { types } from '../models/typeAuth'
import NavMenu from './NavMenu'
import { Button } from 'reactstrap'


const navigation = [
    { name: 'Suscripciones', href: '/anual' },
    { name: 'Perfil', href: '/perfil' },
]


const UsuarioDashboard = (props) => {
    const { authAction, auth } = useAuth()
    const [dataUsuario, setDataUsuario] = useState();
    const [dataSubscripcion, setDataSubscripcion] = useState();

    console.log(auth.session);
    const dateEnd = new Date((dataSubscripcion?.allSubscription?.data[0]?.current_period_end) * 1000).toLocaleDateString();
    const dateStart = new Date((dataSubscripcion?.allSubscription?.data[0]?.current_period_start) * 1000).toLocaleDateString();

    const handleLogout = async () => {
        try {
            const action = {
                type: types.logout,
                payload: {
                }
            }
            authAction(action)
        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        const obtenerUsuario = async () => {

            var myHeaders = new Headers();
            myHeaders.append("Authorization", auth.session.api_token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch(`http://localhost:8080/obtener/cliente?api_token=${auth.session.api_token}&email=${auth.session.email}`, requestOptions);

            if (response.status === 401) {
                const action = {
                    type: types.logout,
                    payload: {
                    }
                }
                authAction(action)

            }

            const result = await response.json();
            setDataUsuario(result.data)
            console.log(result?.data);
            console.log(dataSubscripcion?.allSubscription?.data[0]?.status);
            console.log(dataSubscripcion?.allSubscription?.data[0]?.plan?.interval);
        }
        obtenerUsuario();



    }, [])

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



    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="isolate bg-gradient-r from-cyan-600 to-lime-800" >

            <NavMenu />
            <main>
                <div className="relative px-6 lg:px-8">
                    <div>
                        <section className="text-gray-700 body-font overflow-hidden">
                            <div className="container px-5 py-24 mx-auto">
                                <a name="suscripcion"></a>
                                <div className="flex flex-col text-center w-full mb-20">
                                    <h2 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Hola {auth.session.nombre} tu membresía {dataSubscripcion?.allSubscription?.data[0]?.plan?.interval === "month" ? "mensual" : "anual"} esta {
                                        dataSubscripcion?.subscription?.status == "active" ||dataSubscripcion?.allSubscription?.data[0]?.status == 'active' ? <span className="text-green-500">activa</span>
                                            : <span className="text-red-500">inactiva</span>
                                    }</h2>
                                    <p>Inicio de tu membresía: {dateStart} </p>
                                    <p>Fecha de termino tu membresía: {dateEnd}  </p>
                                </div>
                                <div className="text-center">
                                    {
                                        dataSubscripcion?.subscription?.status == "active" ? "Membresía Iknesoft" :
                                            <>
                                            <p>Elige suscripción</p>
                                                <div className='my-6'>
                                                    <Button color="primary" href="/hosting/mensual" >Renovar suscripción mensual</Button>
                                                </div>
                                                <div className='my-3'>
                                                    <Button color="primary" href="/hosting/anual" >Renovar suscripción anual</Button>
                                                </div>
                                            </>



                                    }


                                    <div className='flex justify-center items-center'>
                                        <a href="perfil/informacion" className="">¿Necesitas ayuda?</a>
                                    </div>
                                    <div className="p-3 xl:w-1/4 md:w-1/2 w-full">
                                        {/* <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                                            <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>

                                            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                                <span>$38</span>
                                                <span className="text-lg ml-1 font-normal text-gray-500">/Mes</span>
                                            </h1>
                                            <p className="flex items-center text-gray-600 mb-2">
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>Hosting
                                            </p>
                                            <p className="flex items-center text-gray-600 mb-2">
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>Etc...
                                            </p>
                                            <button className="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded"
                                                onClick={
                                                    (e) => {
                                                        e.preventDefault();
                                                        window.location.href = '/PagoMes';
                                                    }
                                                }
                                            >Comprar
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7">

                                                    </path>
                                                </svg>
                                            </button>
                                            <p className="text-xs text-gray-500 mt-3">La mejor opción mensual.</p>
                                        </div> */}
                                    </div>

                                    {/* <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                                <span>$72</span>
                                                <span className="text-lg ml-1 font-normal text-gray-500">/Año</span>
                                            </h1>

                                            <p className="flex items-center text-gray-600 mb-2">
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>Hosting
                                            </p>
                                            <p className="flex items-center text-gray-600 mb-2">
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>Etc...
                                            </p>

                                            <button className="flex items-center mt-auto text-white bg-gray-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-600 rounded"
                                                onClick={
                                                    (e) => {
                                                        e.preventDefault();
                                                        window.location.href = '/PagoAnual';
                                                    }
                                                }
                                            >Comprar
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                            <p className="text-xs text-gray-500 mt-3">La mejor opción anual.</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default UsuarioDashboard