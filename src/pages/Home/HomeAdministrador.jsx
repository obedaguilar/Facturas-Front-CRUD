import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import FooterHome from './FooterHome'
import ModalHome from './ModalHome'
import PlanesMesAnual from '../../components/PlanesMes'
import { useAuth } from '../../context/AuthContext'
import MyImageHost from '../../img/mihosting.png'
import { types } from '../../models/typeAuth'
import NavMenuAdmin from '../../components/NavMenuAdmin'

const navigation = [
    // { name: 'Suscripciones', href: '/login' },
    { name: 'Perfil', href: '/perfil' },
]



const HomeAdministrador = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const destinationRef = useRef(null);

    const handleScroll = () => {
        destinationRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const { authAction, auth } = useAuth();

    const handleLogout = async (values) => {

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

    return (

        <main>
            <NavMenuAdmin/>
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            </div>
            
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                    <div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">

                        </div>
                        <div>
                            <div>
                                <div className='flex justify-center items-center text-center'>
                                    <div className='w-full'>
                                        <h1 className="text-4xl  text-green-400 font-bold tracking-tight sm:text-center sm:text-6xl">
                                            <a href="/perfil/admin" className='hover:text-green-300' >¡Bienvenido {auth.session.nombre}!</a>
                                        </h1>
                                    </div>
                                    <div className='w-full'>
                                        <img src={MyImageHost} alt="logo iknesoft" className='w-full h-full' />
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                                Tenemos nuestro equipo encargado de darle el mejor servicio de hosting para su página web, con
                                precios accesibles.

                            </p>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                {/* <a
                                        href="#suscripcion"
                                        className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700" 
                                    >
                                        Ver planes
                                        <span className="text-indigo-200" aria-hidden="true">
                                            &rarr;
                                        </span>
                                    </a> */}



                            </div>
                        </div>
                        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                            <svg
                                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                                viewBox="0 0 1155 678"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                                    fillOpacity=".3"
                                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                                />

                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            <FooterHome />
        </main>




    )
}

export default HomeAdministrador