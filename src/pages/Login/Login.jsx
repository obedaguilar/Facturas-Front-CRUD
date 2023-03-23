import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { types } from '../../models/typeAuth';
import LoginNavMenu from './LoginNavMenu';

const Login = () => {

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token'); // <--- This is the line that is causing the error
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMensaje, setErrorMensaje] = useState("");

    const { authAction } = useAuth()

    const handleLogin = async (values) => {

        try {

            const action = {
                type: types.login,
                payload: {
                    session: values,
                    token: values.token,
                }
            }

            authAction(action)

        } catch (e) {
            console.log(e);
        }
    }


    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login/', {
                // mode : 'no-cors', //mode no-cors evita el error de cors en el navegador pero no en el servidor de node
                
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ //datos que se envian al servidor en formato json
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            console.log(data);
        
            if (data.api_token) {
                const action = {
                    type: types.login,
                    payload: {
                        session: data,
                        token: data.api_token,
                    }
                }
                authAction(action);
                navigate('/perfil');
                console.log(data);
            }
        
            else {
                setErrorMensaje(data.message);
            
            }
        } catch (e) {
            console.log('error');
        
        }
    

    }




    return (
        <main >
            <LoginNavMenu />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Inicia sesión con tu cuenta</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                            {/* mostramos el mensaje de error si es que no se pudo iniciar sesión
                             */}
                            {errorMensaje && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Error</p>
                                <p>{errorMensaje}</p>
                            </div>}
                        <input type="hidden" name="remember" value="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>

                                <input id="email-address" name="email" type={'email'} onChange={e => setEmail(e.target.value)} autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Correo electrónico" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type={'password'} onChange={e => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Contraseña" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recuerdame</label>
                            </div>

                            <div className="text-sm">
                                <a href="/inicio" className="font-medium text-indigo-600 hover:text-indigo-500">¿No tienes una cuenta?, registrate aquí</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>


    )
}


export default Login