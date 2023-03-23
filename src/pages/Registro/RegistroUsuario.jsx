import React, { useState } from 'react'
import InputPrimary from '../../components/InputPrimary'

const RegistroUsuario = ({ formData, setFormData }) => {

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("hola");
    // }

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    return (
        <main>
            <div className='flex  min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8' >

                <div className=' flex flex-col w-full max-w-md'>
                    <InputPrimary
                        type={'text'}
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}

                    />
                    <InputPrimary
                        type="text"
                        placeholder="Apellido Materno"
                        value={formData.apellidoP}
                        onChange={(e) => setFormData({ ...formData, apellidoP: e.target.value })}
                    />
                    <InputPrimary
                        type="text"
                        placeholder="Apellido Paterno"
                        value={formData.apellidoM}
                        onChange={(e) => setFormData({ ...formData, apellidoM: e.target.value })}
                    />
                        <InputPrimary
                        type="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <InputPrimary
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                
                    {/* <InputPrimary
                        type="password"
                        placeholder="Confirmar Contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    /> */}
                    <InputPrimary
                        type="text"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                </div>
                {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <InputPrimary id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recuerdame</label>
                        </div>

                        <div className="text-sm">
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">¿No tienes una cuenta?</a>
                        </div>
                    </div> */}

            </div>
        </main>

    )
}

export default RegistroUsuario