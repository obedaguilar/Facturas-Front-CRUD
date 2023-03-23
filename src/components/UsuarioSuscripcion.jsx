import React from 'react'
import NavMenu from './NavMenu'

const UsuarioSuscripcion = () => {
    return (
        <div>
            <NavMenu />
            <main>
                <section className="text-gray-700 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <a name="suscripcion"></a>
                        <div className="flex flex-col text-center w-full mb-20">
                            <h2 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Suscripción</h2>

                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Pagos recurrentes.</p>

                        </div>
                        <div className="flex flex-wrap justify-center -m-5">
                            <div className="p-3 xl:w-1/4 md:w-1/2 w-full">
                                <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
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
                                                window.location.href = '/registro';
                                            }
                                        }
                                    >Comprar
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7">

                                            </path>
                                        </svg>
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3">La mejor opción mensual.</p>
                                </div>
                            </div>

                            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                                <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">SPECIAL</h2>
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
                                                window.location.href = '/registro';
                                            }
                                        }
                                    >Comprar
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3">La mejor opción anual.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default UsuarioSuscripcion