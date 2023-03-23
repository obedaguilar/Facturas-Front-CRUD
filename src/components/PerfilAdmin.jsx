import { Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaUpload, FaWindowClose } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { types } from '../models/typeAuth'
import NavMenu from './NavMenu'
import NavMenuAdmin from './NavMenuAdmin'


const PerfilAdmin = () => {

    const { authAction, auth } = useAuth()
    const [dataUsuario, setDataUsuario] = useState({
        nombre: "",
    });
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState("");
    const [errorFile, setErrorFile] = useState('');


    const actualizarUsuarioUnitario = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", auth.session.api_token);

        var formdata = new FormData();
        formdata.append("objectId", dataUsuario.objectId);
        formdata.append("documento", file);
        formdata.append("api_token", dataUsuario.api_token);
        formdata.append("nombre", dataUsuario.nombre);
        formdata.append("apellidoP", dataUsuario.apellidoP);
        formdata.append("apellidoM", dataUsuario.apellidoM);


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:8080/user/actualizar/", requestOptions)

        const data = await response.json()
        console.log(data)
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

            const response = await fetch(`http://localhost:8080/obtener/admin?api_token=${auth.session.api_token}&email=${auth.session.email}`, requestOptions);

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
        }
        obtenerUsuario();



    }, [])

    return (
        <div>
            <NavMenuAdmin />
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Información del perfil admin</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 font-bold">¡Hola! <font className="text-green-500">
                        {dataUsuario.nombre ? dataUsuario.nombre : "Cargando..."}

                    </font>
                    </p>
                    <div className='my-5'>
                        <button className='bg-blue-500 hover:bg-blue-300 shadow-md p-1 rounded-md text-white' onClick={
                            handleOpen
                        }>Editar perfil admin</button>
                    </div>
                    {
                        open ?
                            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                className="flex justify-center items-center"
                            >
                                <div className="bg-white rounded-lg p-4">
                                    <div className='
                                            flex justify-end
                                            '>
                                        <button onClick={handleClose} className="text-right "><FaWindowClose /></button>
                                    </div>
                                    <h2 id="simple-modal-title" className=''>Editar usuario </h2>
                                    <div id="simple-modal-description">
                                        <form className="flex flex-col">
                                            <label htmlFor="nombre" className='text-blue-400'>Nombre</label>
                                            <input type="text" name="nombre" id="nombre" className="border-2 border-gray-300 p-2 rounded-lg"
                                                value={dataUsuario.nombre}
                                                onChange={(e) => { setDataUsuario({ ...dataUsuario, nombre: e.target.value }) }}
                                            />
                                            <label htmlFor="apellido">Apellido Paterno</label>
                                            <input type="text" name="apellido" id="apellido" className="border-2 border-gray-300 p-2 rounded-lg"
                                                value={dataUsuario.apellidoP}
                                                onChange={(e) => { setDataUsuario({ ...dataUsuario, apellidoP: e.target.value }) }}
                                            />
                                            <label htmlFor="apellidoM">Apellido Materno</label>
                                            <input type="text" name="apellidoM" id="apellidoM" className="border-2 border-gray-300 p-2 rounded-lg"
                                                value={dataUsuario.apellidoM}
                                                onChange={(e) => { setDataUsuario({ ...dataUsuario, apellidoM: e.target.value }) }}
                                            />
                                            <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 h-[324px]">
                                                <div className='bg-indigo-600 rounded-lg hover:bg-indigo-500 '>
                                                    <div className='text-center my-6'>
                                                        <label htmlFor="archive_uploads" className='text-white' >
                                                            {file === "" ? "Subir aquí" : "¡Gracias por subirlo!"}
                                                            <div className='content-center flex justify-center '>
                                                                <a className='my-5'><FaUpload style={{ fontSize: '2.5rem', color: "white" }} /></a>
                                                            </div>
                                                        </label>
                                                        <input type="file" id="archive_uploads" name="archive_uploads" accept=".pdf" multiple="" style={{ opacity: "0" }}

                                                            onChange={e => setFile(e.target.files[0])}

                                                        />
                                                        {
                                                            file === "" &&
                                                            errorFile && <div className="alert text-red-500">{errorFile}</div>
                                                        }
                                                        <div className='text-white'>
                                                            {file === "" ? "Actualiza tu archivo" : file.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={
                                                actualizarUsuarioUnitario
                                            }
                                            >Agregar</button>
                                        </form>
                                    </div>
                                </div>
                            </Modal>
                            : null
                    }


                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {dataUsuario.nombre
                                ? dataUsuario.nombre + " " + dataUsuario.apellidoP + " " + dataUsuario.apellidoM : "Cargando..."}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Rol</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{auth.session.objectId == "1ec7e12f-58fe-64f8-ab97-2cf05d694255" ? "Super Admin" : "Admin"}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {dataUsuario.email ?
                                dataUsuario.email : "Cargando..."
                            }</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Otro campo</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{

                                dataUsuario.nombre ? dataUsuario.nombre : "Cargando..."
                            }</dd>
                        </div>

                        {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">

                                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div className="flex w-0 flex-1 items-center">
                                            <svg className="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                                            </svg>
                                            <span className="ml-2 w-0 flex-1 truncate"> {dataUsuario.documento
                                                ? dataUsuario.documento : "Cargando..."
                                            }</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={dataUsuario.documento

                                            } className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">Descarga tu comprobante fiscal</a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div> */}
                    </dl>
                </div>
            </div>

        </div>
    )
}

export default PerfilAdmin