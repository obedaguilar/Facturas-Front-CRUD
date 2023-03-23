import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import FooterHome from '../pages/Home/FooterHome'
import ModalHome from '../pages/Home/ModalHome'
import PlanesMesAnual from './PlanesMes'
import { useAuth } from '../context/AuthContext'

const navigation = [
    // { name: 'Suscripciones', href: '/login' },
    // { name: 'Perfil', href: '/register' },
]



const Home = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const destinationRef = useRef(null);

    const handleScroll = () => {
        destinationRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const { authAction, auth } = useAuth();


    return (

        <main>
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg
                    className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                    viewBox="0 0 1155 678"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                        fillOpacity=".3"
                        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                    />

                </svg>
            </div>
            <div className="px-6 pt-6 lg:px-8">
                <div>
                    <nav className="flex h-9 items-center justify-between" aria-label="Global">
                        <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                        <p className=' font-bold text-xl text-white bg-gradient-to-r from-blue-500 to-green-400 rounded-xl'>Iks</p>
                        </div>
                        <div className="flex lg:hidden">

                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                            {

                                navigation.map((item) => (
                                    <a key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                                        {item.name}
                                    </a>
                                ))}
                        </div>

                        <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end ">
                            <Link to={'/login'} className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </nav>
                    <div className='text-center my-5'>
                        {/* <div className="flex justify-center">
                            Si no eres miembro de Iknesoft , <ModalHome />
                        </div> */}
                    </div>
                    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                            <div className="flex h-9 items-center justify-between">
                                <div className="flex">
                                    <a href="#" className="-m-1.5 p-1.5">
                                        <span className="sr-only">Mi compañia</span>
                                       <p>Iks</p>
                                    </a>
                                </div>
                                <div className="flex">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                    <div className="py-6">
                                        <Link to={'/login'} className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">
                                            Iniciar Sesión
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </div>
            </div>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pb-32  sm:pb-40">
                    <div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">

                        </div>
                        <div>
                            <h1 className="text-4xl  bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold tracking-tight sm:text-center sm:text-6xl my-5 py-4 ">
                                Pagos recurrentes Iknesoft
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center  font-mono">
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
                                <Link to={'#suscripcion'} onClick={handleScroll} className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                                    Ver planes
                                    <span className="text-indigo-200" aria-hidden="true">
                                        &rarr;
                                    </span>
                                </Link>


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
                <div className="flex flex-col text-center w-full ">
                    <a name="suscripcion" ref={destinationRef}></a>
                    {/* agregamos el texto con el gradiente lo ponemos transparente y usamos la propiuedad text-transparent y bg-clip-text para que el texto se vea con el gradiente */}
                    <h2 className="sm:text-4xl text-3xl font-medium title-font mb-2 bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500">Suscripción</h2>

                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-mono">Pagos recurrentes.</p>

                </div>

                <PlanesMesAnual />
            </div>
            <FooterHome />
        </main>




    )
}

export default Home