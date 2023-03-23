import { Disclosure, Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext';
import { types } from '../models/typeAuth';




const navigation = [
    { name: 'Inicio', href: '/inicio/perfil', current: false },
    { name: 'Facturas', href: '/facturas', current: false },
    { name: 'Suscripción', href: '/suscripcion', current: false },
    { name: 'Perfil', href: '/perfil', current: false },
    { name: 'Métodos de pago', href: '/perfil/metodopago', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavMenu = () => {

    const { authAction } = useAuth()

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
        <Disclosure as="nav" className="bg-black">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-8 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-8 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-cyan-600 text-white' : 'text-gray-300   hover:text-green-500',
                                                    'px-3 py-1 rounded-xl text-sm font-medium '
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                                style={{
                                                   
                                                    
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                </button> */}

                                {/* Profile dropdown */}
                                <div className=' text-gray-300  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                <div className='cursor-pointer flex items-center justify-center'>
                                        <a title="Cerrar sesión" onClick={
                                            handleLogout
                                        }><FaSignOutAlt style={{
                                            fontSize: "1.5rem",
                                            marginTop: "0.5rem",
                                        }} /></a>
                                    </div>
                                    <div>
                                        <p className='cursor-pointer'>Cerrar sesión</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>

    )
}

export default NavMenu