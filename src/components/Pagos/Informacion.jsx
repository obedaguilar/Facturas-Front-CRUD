import React, { useState } from 'react'
import NavMenu from '../NavMenu'
import CancelarSuscripcion from './CancelarSuscripcion';

const Informacion = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);




    const handleMostrarFormulario = () => {
        setMostrarFormulario(true);
    };


    return (
        <main>
            <NavMenu />
            <div className='flex justify-left items-center my-8'>

                <ol>

                    <li>
                        <div>
                            {mostrarFormulario ? (
                                <CancelarSuscripcion/>
                            ) : (
                                <button onClick={handleMostrarFormulario} className="underline text-blue-500">¿Quieres cancelar suscripción?</button>
                            )}
                        </div>
                    </li>
                    <li><a href='/'>¿Para qué sirve esto?</a></li>
                    <li><a href='https://iknesoft.com/'>¿Necesitas contactarnos?</a></li>

                </ol>
            </div>
        </main>
    )
}

export default Informacion