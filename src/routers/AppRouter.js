import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Facturas from '../components/Facturas';
import Home from '../components/Home';
import Login from '../pages/Login/Login';
import NavMenu from '../components/NavMenu';
import NavMenuAdmin from '../components/NavMenuAdmin';
import Perfil from '../components/Perfil';
import Registro from '../pages/Registro/Registro';
import RegistrosAdmin from '../components/RegistrosAdmin';
import Dashboard from '../components/UsuarioDashboard';
import UsuarioSuscripcionAnual from '../components/Pagos/UsuarioSuscripcionAnual';
import UsuarioSuscripcionMensual from '../components/Pagos/UsuarioSuscripcionMensual';
import { useAuth } from "../context/AuthContext";
import HomePerfil from '../pages/Home/HomePerfil';
import HomeAdministrador from '../pages/Home/HomeAdministrador';
import PerfilAdmin from '../components/PerfilAdmin';
import FacturasAdmin from '../components/FacturasAdmin';
import PagoSubscripcion from '../components/Pagos/PagoSubscripcion';
import MetodosPagoPerfil from '../components/Pagos/MetodosPagoPerfil';
import Informacion from '../components/Pagos/Informacion';


export const AppRouter = () => {

    // para mostrar tipo de usuario 
    const { auth } = useAuth()

    if (auth.logged === false) {
        return (
            <div>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/inicio" element={<Home />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/registro/anual" element={<Registro type={"anual"}/>} />
                        <Route path="/registro/mensual" element={<Registro type={"mensual"}/>} />
                        <Route path="/*" element={<Navigate to="/inicio" />} />
                    </Routes>
                </Router>
            </div>

        );

    }
    // aca se jala el objeto del arreglo para el tipo de usuario con auth.session.type que es igual a 1
    const tipoUsuario = auth.session.rol.name;
    // const tipoUsuarioId = auth.session.rol.id;
    if (tipoUsuario === "Cliente") {
        return (

            <Router>
                <Routes>
                    <Route path="/suscripcion" element={<Dashboard />} />
                    <Route path="/menu" element={<NavMenu />} />
                    <Route path="/inicio/perfil" element={<HomePerfil />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/facturas" element={<Facturas />} />
                    <Route path="/*" element={<Navigate to="/perfil" />} />
                    <Route path="/hosting/mensual" element={<UsuarioSuscripcionMensual />} />
                    <Route path="/hosting/pago" element={<PagoSubscripcion />}  />
                    <Route path="/hosting/anual" element={<UsuarioSuscripcionAnual />} />
                    {/* <Route path="/hosting/anual/pago" element={<PagoSubscripcionAnual />}  /> */}
                    <Route path="/perfil/metodopago" element={<MetodosPagoPerfil />}  />
                    <Route path="perfil/informacion" element={<Informacion />} />
                </Routes>

            </Router>


        );
    }
    else if(tipoUsuario === "SuperAdmin"){
    return (

        <Router>
            <Routes>
                <Route path="/menuAdmin" element={<NavMenuAdmin />} />
                <Route path="/clientes/admin" element={<RegistrosAdmin />} />
                <Route path="/perfil/admin" element={<PerfilAdmin />} />
                {/* <Route path="/directorio/admin" element={<DirectorioAdmin />} /> */}
                <Route path="/inicio/perfil/admin" element={<HomeAdministrador />} />
                <Route path="/facturas/admin" element={<FacturasAdmin />} />
                <Route path="/*" element={<Navigate to="/perfil/admin" />} />
            </Routes>
        </Router>
    );
    }
    else if (tipoUsuario === "Admin") {
        return (

            <Router>
                <Routes>
                    <Route path="/menuAdmin" element={<NavMenuAdmin />} />
                    <Route path="/clientes/admin" element={<RegistrosAdmin />} />
                    {/* <Route path="/directorio/admin" element={<DirectorioAdmin />} /> */}
                    <Route path="/*" element={<Navigate to="/menuAdmin" />} />
                </Routes>
            </Router>
        );
    }
    else {
        return (
            <div>
                <h1>404</h1>
            </div>
        );
    }
}