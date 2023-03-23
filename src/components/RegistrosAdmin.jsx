import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaBlog, FaEdit, FaFilePdf, FaLemon, FaPlane, FaSave, FaTimes, FaTrash, FaUpload, FaUserAlt, FaUserCog, FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { types } from '../models/typeAuth';
import NavMenuAdmin from './NavMenuAdmin';




const RegistrosAdmin = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [files, setFiles] = useState([]);
    const { authAction, auth } = useAuth()
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openPass, setOpenPass] = useState(false);

    const [selectedUser, setSelectedUser] = useState(
        {
            nombre: "",
            apellidoP: "",
            objectId: "",
            apellidoM: "",
            documento: "",
            isActive: "",
            newPassword: "",

        }
    );
    const [apellidoP, setSetApellidoM] = useState("");
    const [isActive, setIsActive] = useState(selectedUser.isActive);
    const [inactive, setInactive] = useState(!selectedUser.isActive);
    const [file, setFile] = useState("");
    const [errorFile, setErrorFile] = useState('');
    const [dataSubscripcion, setDataSubscripcion] = useState([]);
    const [dataSubscripciones, setDataSubscripciones] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");



    useEffect(() => {

        try {


            const fetchUsuario = async () => {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", auth.session.api_token);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(`http://localhost:8080/obtener/registros/clientes?api_token=${auth.session.api_token}`, requestOptions);

                const result = await response.json();
                setUsuarios(result.data);
                console.log(result?.data);
            }
            fetchUsuario();

            // if (auth.session.type === types.NOT_AUTHENTICATED) {
            //     navigate('/login');
            // }
        } catch (error) {
            console.log(error);

        }


    }, []);



    const handleClose = () => setOpen(false);

    // const handleEliminarUser = async (objectId) => {
    //     const response = await fetch(`http://localhost:8080/eliminar/usuario/total/${objectId}`, {
    //         method: "DELETE"
    //     })
    //     if (response.ok) {
    //         setUsuarios(usuarios.filter(usuario => usuario.objectId !== objectId))
    //     }
    // }


    const handleEliminarUsuario = async (objectId) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", auth.session.api_token);



        var formdata = new FormData();
        formdata.append("api_token", auth.session.api_token);
        formdata.append("objectId", objectId);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:8080/eliminar/usuario/`, requestOptions)
        if (response.ok) {
            alert('Usuario eliminado correctamente')
            setUsuarios(usuarios.filter(usuario => usuario.objectId !== objectId))
        }

    }

    const handleUpdatePassword = async () => {
        // const myHeaders = new Headers();
        // myHeaders.append("Authorization", auth.session.api_token);

        const formdata = new FormData();
        formdata.append("objectId", selectedUser.objectId);

        formdata.append("newPassword", newPassword);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:8080/actualizar/password`, requestOptions)
        if (selectedUser.password === "") {
            alert('El campo password no puede estar vacio')
            return;
        }
        const data = await response.json();
        console.log(data?.message)
        if (response.ok) {
            alert(data.message)
            // setUsuarios(usuarios.filter(usuario => usuario.objectId !== objectId))
        }
    }

    //para edita usuario con el admin
    const handleActualizarUsuario = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", auth.session.api_token);

        const formdata = new FormData();
        formdata.append("objectId", selectedUser.objectId);
        formdata.append("api_token", auth.session.api_token);
        formdata.append("nombre", selectedUser.nombre);
        formdata.append("apellidoP", selectedUser.apellidoP);
        formdata.append("apellidoM", selectedUser.apellidoM);
        formdata.append("documento", selectedUser.documento);
        formdata.append("isActive", selectedUser.isActive);
        // formdata.append("password", selectedUser.password);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const response = await fetch("http://localhost:8080/editar/usuarios/", requestOptions)
        if (selectedUser.documento) {
            formdata.append("documento", files);
        } else if (files === "") {
            console.log("No hay nada que cambiar.");
        }
        if (selectedUser.nombre === "") {
            alert('El campo nombre no puede estar vacio')
            return;
        }
        if (selectedUser.apellidoP === "") {
            alert('El campo apellido materno no puede estar vacio')
            return;
        }
        if (selectedUser.apellidoM === "") {
            alert('El campo apellido materno no puede estar vacio')
            return;
        }

        const data = await response.json();
        console.log(data?.message)
        if (response.ok) {
            alert(data.message)
            // setUsuarios(usuarios.filter(usuario => usuario.objectId !== objectId))
        }
    }

    const handleCheckboxChange = (e) => {
        const value = e.target.checked ? 1 : 0;
        setSelectedUser({
            ...selectedUser,
            isActive: value
        });
    }



    const handleObtenerSubscripcion = async (email) => {

        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", auth.session.api_token);

        const requestOptions = {
            method: 'GET',
            // headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`http://localhost:8080/stripe/obtener/subscription/?customer_email=${email}`, requestOptions);
        if (response.status === 401) {
            const action = {
                type: types.logout,
                payload: {
                }
            }
            authAction(action)
        }
        const resultSub = await response.json();
        setDataSubscripcion({ ...dataSubscripcion, [email]: resultSub })
        console.log(resultSub);
    }





    return (<div>
        <NavMenuAdmin />
        <main>
            {/* Sistema de facturación */}
            {/* tabla CRUD */}
            <div className="flex flex-col">
                <div className=" overflow-x-auto">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fecha de creación
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cliente
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Suscripción
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Comprobante fiscal
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actualizar contraseña
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Editar
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Eliminar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usuarios ?
                                        usuarios.map((usuario, index) => (
                                            <tr key={usuario.objectId}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{index + 1}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{usuario.updated_at}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{`${usuario.nombre + " " + usuario.apellidoP + " " + usuario.apellidoM} `}</div>
                                                    <div className="text-sm text-gray-900">{`${usuario.apellidoP} `}</div>
                                                    <div className="text-sm text-gray-900">{`${usuario.apellidoM} `}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        <button href="#" className="text-white  content-center text-center bg-blue-500 hover:bg-blue-300 p-1 rounded-md flex items-center" onClick={() => {
                                                            handleObtenerSubscripcion(usuario.email)
                                                        }}>
                                                            Ver subscripción</button>
                                                        {dataSubscripcion[usuario.email] && (
                                                            <>
                                                                <div>{dataSubscripcion[usuario.email].subscription.id}</div>
                                                                <div className='text-green-500'>Status: {dataSubscripcion[usuario.email].subscription.status == "active" ? "Activo" : "Inactivo"}</div>
                                                                {

                                                                }
                                                                <div>Fecha de inicio: {new Date((dataSubscripcion[usuario.email].subscription.current_period_start) * 1000).toLocaleDateString()}</div>
                                                                <div>Fecha fin: {new Date((dataSubscripcion[usuario.email].subscription.current_period_end) * 1000).toLocaleDateString()}</div>
                                                                <div className='text-orange-400'>Plan: {dataSubscripcion[usuario.email].subscription.plan.interval == "month" ? "Mensual" : "Anual"}</div>

                                                            </>

                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {
                                                        usuario.documento ?
                                                            <a href={usuario.documento} target="_blank" download>
                                                                <FaFilePdf style={{ fontSize: "2rem", color: "Red" }} />
                                                                <p className='text-blue-500 hover:text-blue-300'>Descargar constancia {usuario.nombre}</p>
                                                            </a>
                                                            : <p className='text-red-500'>No hay constancia</p>
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-green-600 hover:text-green-900 flex justify-center items-center" onClick={
                                                        () => {
                                                            setSelectedUser(usuario);
                                                            setOpenPass(true);
                                                        }
                                                    }>
                                                        <FaUserCog style={{ fontSize: "1.5rem" }} /></a>
                                                    <p className='text-green-600'>Nueva contraseña</p>
                                                 
                                                </td>
                                                

                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-blue-600 hover:text-blue-900 flex justify-center items-center" onClick={
                                                        () => {
                                                            setSelectedUser(usuario);
                                                            setOpen(true);
                                                        }
                                                    }>
                                                        <FaEdit style={{ fontSize: "1.5rem" }} />Editar</a>
                                                </td>
                                                <td className="px-12 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <button href="#" className="text-red-600 hover:text-red-900 content-center text-center flex items-center" onClick={() => handleEliminarUsuario(usuario.objectId)}>
                                                        <FaTrash style={{ fontSize: "1.5rem" }} />Eliminar</button>
                                                </td>
                                            </tr>
                                        )) : navigate("/login")}
                                </tbody>
                            </table>
                            {
                                open ?
                                    <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        className="flex flex-col items-center overflow-y-auto my-8 sm:flex-auto"
                                    >
                                        <div className="bg-white rounded-lg p-4">
                                            <div className='
                                            flex justify-end
                                            '>
                                                <button onClick={handleClose} className="text-right "><FaWindowClose /></button>
                                            </div>
                                            <h2 id="simple-modal-title" className=''>Editar usuario {
                                                selectedUser ? selectedUser.nombre : null
                                            } </h2>
                                            <div id="simple-modal-description">
                                                <form className="flex flex-col">
                                                    <label htmlFor="nombre" className='text-blue-400'>Nombre</label>
                                                    <input type="text" name="nombre" id="nombre" className="border-2 border-gray-300 p-2 rounded-lg"
                                                        value={selectedUser.nombre}
                                                        onChange={
                                                            (e) => {
                                                                setSelectedUser({
                                                                    ...selectedUser,
                                                                    nombre: e.target.value
                                                                })
                                                            }
                                                        } />
                                                    <label htmlFor="apellido">Apellido Paterno</label>
                                                    <input type="text" name="apellido" id="apellido" className="border-2 border-gray-300 p-2 rounded-lg"
                                                        value={selectedUser.apellidoP}
                                                        onChange={
                                                            (e) => {
                                                                setSelectedUser({
                                                                    ...selectedUser,
                                                                    apellidoP: e.target.value
                                                                })
                                                            }
                                                        } />
                                                    <label htmlFor="apellidoM">Apellido Materno</label>
                                                    <input type="text" name="apellidoM" id="apellidoM" className="border-2 border-gray-300 p-2 rounded-lg"
                                                        value={selectedUser.apellidoM}
                                                        onChange={
                                                            (e) => {
                                                                setSelectedUser({
                                                                    ...selectedUser,
                                                                    apellidoM: e.target.value
                                                                })
                                                            }
                                                        } />

                                                    <div className="flex items-center justify-center">
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="checkbox"
                                                            name="isActive"
                                                            id="isActive"
                                                            className="border-2 border-gray-300 p-2 rounded-lg"
                                                            checked={selectedUser.isActive === 1}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label htmlFor="isActive" className='m-3'>{selectedUser.isActive === 1 ? 'Activo' : 'Inactivo'}</label>
                                                    </div>
                                                    <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 h-[200px]">
                                                        <div className='bg-indigo-600 rounded-lg hover:bg-indigo-500 '>
                                                            <div className='text-center my-3'>
                                                                <label htmlFor="archive_uploads" className='text-white' >
                                                                    {file === "" ? "Subir aquí" : "¡Gracias por subirlo!"}
                                                                    <div className='text-center '>
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
                                                    <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg m-2" onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            handleActualizarUsuario(selectedUser.objectId)
                                                            setOpen(false);
                                                        }
                                                    }>Guardar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Modal>
                                    : null
                            }
                               {
                                                        openPass ? (
                                                            <Modal open={openPass} onClose={handleClose} aria-labelledby="simple-modal-title"
                                                                aria-describedby="simple-modal-description"
                                                                className="flex flex-col items-center overflow-y-auto my-8 sm:flex-auto"
                                                            >
                                                                <div className="bg-white rounded-md p-4">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="flex items-center">
                                                                            <div className="text-gray-600">Nueva contraseña</div>
                                                                        </div>
                                                                        <div className="cursor-pointer z-50" onClick={() => setOpenPass(false)}>
                                                                            <FaTimes />
                                                                        </div>
                                                                    </div>
                                                                    <div>Actualizar a {selectedUser.nombre}</div>
                                                                    <div className="mt-4">
                                                                        <input type="password" className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-400" placeholder="Nueva contraseña" onChange={
                                                                            (e) => {
                                                                                setNewPassword(e.target.value);
                                                                            }
                                                                        } />
                                                                    </div>


                                                                    <div className="mt-4 flex justify-end">
                                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400" onClick={() => handleUpdatePassword(selectedUser.objectId)}>Actualizar</button>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        ) : null
                                                    }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    )
}

export default RegistrosAdmin