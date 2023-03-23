import React, { useEffect, useState } from 'react'
import NavMenu from './NavMenu'
import { FaEye, FaDownload } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';





const Facturas = () => {
    const { authAction, auth } = useAuth();
    const [data, setData] = useState();
    //     const [data,setData] = useState([]);


    //     useEffect(() => {
    //         //la primera es la declaracion de la funcion para que se mande a llamar
    //         const miApiUsuario = async () => {
    //         const response = await fetch('http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/registro/clientes')
    //         const result = await response.json();
    //         setData(result.data);


    //         }
    //         miApiUsuario();
    // }, [])

    console.log(auth)

    useEffect(() => {
        try {
            const fetchFactura = async () => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", auth.session.api_token);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                const response = await fetch(`http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/obtener/facturas/cliente/?objectId=${auth.session.objectId}&api_token=${auth.session.api_token}&user_invoice_objectId=${auth.session.objectId}`, requestOptions);
                const result = await response.json();
                setData(result.data);
                console.log(result?.data);


            }
            fetchFactura();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <NavMenu />
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
                                                Factura No.
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
                                                Ver
                                            </th>
                                     

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {data ?
                                            data.map((data, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{index + 1}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{data.fecha_factura}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{auth.session.nombre}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{data.mes_factura}</div>
                                                    </td>
                                                   

                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {data.url_factura ?
                                                            <a href={data.url_factura} className="text-green-600 hover:text-green-900">
                                                                <FaEye style={{ fontSize: "1.5rem" }} /></a>
                                                            : <p className='text-red-500'>No hay constancia</p>
                                                        }
                                                    </td>
                                                    {/* <td className="px-12 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <a href={data.url_factura} download className="text-blue-600 hover:text-blue-900 content-center text-center"
                                                        >
                                                            <FaDownload style={{ fontSize: "1.5rem" }} /></a>
                                                    </td> */}
                                                </tr>
                                            )) : null
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>




            </main>
        </div>

    )
}

export default Facturas