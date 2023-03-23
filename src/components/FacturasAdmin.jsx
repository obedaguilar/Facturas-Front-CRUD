import React, { useEffect, useRef, useState } from 'react'
import { FaEdit, FaInvision, FaUpload, FaWindowClose } from 'react-icons/fa';
import { Modal } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { types } from '../models/typeAuth';
import NavMenu from './NavMenu'
import NavMenuAdmin from './NavMenuAdmin'
import { useNavigate } from 'react-router-dom';





const FacturasAdmin = () => {
    const today = new Date();
    // const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const { authAction, auth } = useAuth()
    const [subscriptions, setSubscriptions] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [userInvoice, setUserInvoice] = useState(
        {
            nombre: "",
            apellidoP: "",
            objectId: "",
            documento: "",
        }
    );
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("");
    const [errorFile, setErrorFile] = useState('');
    const [usuarios, setUsuarios] = useState();

    //el useRef es para poder acceder al input file y poder obtener el archivo que se sube al input
    const fileInputRef = useRef(null);
    //obtenemos la fecha en español
    const date = new Date();
    const monthName = date.toLocaleString('es', { month: 'long' });

    useEffect(() => {
        const fetchSubscriptions = async () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", auth.session.api_token);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const response = await fetch(`http://localhost:8080/stripe/obtener/subscriptionBD/?api_token=${auth.session.api_token}`, requestOptions);
            const data = await response.json();
            console.log(data.suscripcion);
            setSubscriptions(data.suscripcion);


        }
        fetchSubscriptions()
    }, [])

    const handleFacturar = async () => {

        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", auth.session.api_token);

            const formdata = new FormData();
            formdata.append("mes_factura", monthName);
            formdata.append("nombre_cliente", userInvoice.customer_email);
            formdata.append("user_invoice_objectId", userInvoice.customer_id_object_subs);
            formdata.append("email_cliente", userInvoice.customer_email);
            formdata.append("nombre_factura", "Factura");


            formdata.append("url_factura", fileInputRef.current.files[0]);

            formdata.append("objectId", userInvoice.customer_id_object_subs);
            formdata.append("api_token", auth.session.api_token);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch("http://localhost:8080/insertar/facturas", requestOptions)

            const data = await response.json();
            console.log(data);

            if (data.success === true) {
            
                window.location.reload();
            }


        } catch (error) {
            console.log(error);

        }


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
        console.log(resultSub);
    }





    return (
        <main>
            <NavMenuAdmin />
            <div>Aca se va a facturar el cliente</div>
            <div>
                <div className="flex flex-col">
                    <div className=" overflow-x-auto">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className='min-w-full divide-y divide-gray-300'>
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email cliente
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status pago
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                id suscripción
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Titulo de suscripción
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                otro campo
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status factura
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Facturar
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        {subscriptions && subscriptions.map((subscription) => (
                                            <tr key={subscription.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.customer_email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.id_suscripcion ? <div className='text-green-500 bg-slate-50 rounded-sm'>Pago exitoso</div> : "sin pagar"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.id_suscripcion}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.title_suscripcion ? "carga automática" : "sin cargar"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">otro campo</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subscription.status_factura === 0 ? <div className='text-red-500'>No hay factura</div> : <div className='text-green-500'>Facturado</div>}</td>
                                                <td className="px-6 py-4 whitespace-nowrap"><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={
                                                    () => {
                                                        setOpen(true);
                                                        setUserInvoice(subscription)


                                                    }
                                                }>Facturar</button></td>
                                                {/* <td><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Editar</button></td>  */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {
                                    open ?
                                        <Modal open={open} aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                            className="flex flex-col items-center overflow-y-auto my-8 sm:flex-auto"
                                        >
                                            <div className="bg-white rounded-lg p-4">
                                                <div className='
                                            flex justify-end
                                            '>
                                                    <button onClick={() => { setOpen(false) }} className="text-right "><FaWindowClose /></button>
                                                </div>

                                                <div className='flex-col justify-center items-center text-center '>
                                                    <div className='flex-1'>
                                                        <label htmlFor="nombre" className='text-blue-400'>Email</label>
                                                        <input type="text" name="nombre" id="nombre" className="border-2 border-gray-300 p-2 rounded-lg"
                                                            value={userInvoice.customer_email}
                                                            onChange={
                                                                (e) => {
                                                                    setUserInvoice({
                                                                        ...userInvoice,
                                                                        customer_email: e.target.value
                                                                    })
                                                                }
                                                            } />
                                                    </div>
                                                    <div className='flex-1'>

                                                        <label htmlFor="nombre" className='text-blue-400'>Id</label>
                                                        <input type="text" name="nombre" id="nombre" className="border-2 border-gray-300 p-2 rounded-lg"
                                                            value={userInvoice.customer_id_object_subs}
                                                            onChange={
                                                                (e) => {
                                                                    setUserInvoice({
                                                                        ...userInvoice,
                                                                        customer_id_object_subs: e.target.value
                                                                    })
                                                                }
                                                            } />
                                                    </div>

                                                    <div className='flex-1'>

                                                        <label htmlFor="nombre" className='text-blue-400'>Id</label>
                                                        <input type="text" name="nombre" id="nombre" className="border-2 border-gray-300 p-2 rounded-lg"
                                                            value={userInvoice.id_suscripcion}
                                                            onChange={
                                                                (e) => {
                                                                    setUserInvoice({
                                                                        ...userInvoice,
                                                                        id_suscripcion: e.target.value
                                                                    })
                                                                }
                                                            } />
                                                    </div>

                                                </div>
                                                <div className="">
                                                    <div className='bg-indigo-600 rounded-lg hover:bg-indigo-500 '>
                                                        <div className='text-center my-3'>
                                                            <h1 className='text-white text-2xl'>Factura</h1>

                                                            <label htmlFor="archive_uploads" className='flex justify-center' >
                                                                {file === "" ? "Subir aquí" : "¡Gracias por subirlo!"}
                                                                <div className='items-center'>
                                                                    <a className='my-5'><FaUpload style={{ fontSize: '2.5rem', color: "white" }} /></a>
                                                                </div>
                                                            </label>
                                                            <input type="file" ref={fileInputRef} id="archive_uploads" name="archive_uploads" accept=".pdf" multiple="" style={{ opacity: "0" }}
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
                                                <div className='text-center'>
                                                    <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg" onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            handleFacturar();

                                                            setOpen(false);
                                                            
                                                        }
                                                    }>Guardar</button>{
                                                    
                                                    }
                                                </div>


                                            </div>
                                        </Modal>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>

    )
}

export default FacturasAdmin