import React, { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Back from '../../components/ButtonBack'
import { useAuth } from '../../context/AuthContext';
import { types } from '../../models/typeAuth';
import '../../styles/MyCheckSucces.css';
import MyImageHost from '../../img/mihosting.png'


const Registro = (props) => {
  // console.log(type)
  const navigate = useNavigate();

  // const [page, setPage] = useState(0)
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [file, setFile] = useState("");
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [error, setError] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellidoP, setErrorApellidoP] = useState('');
  const [errorApellidoM, setErrorApellidoM] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [errorFile, setErrorFile] = useState('');
  const { authAction } = useAuth()


  //para el envio del otro formulario



  // const FormTitles = ["Registro", "Documentos", "Agregar nueva tarjeta", "Finalizar"];
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!nombre) {
      setErrorNombre('Ingrese su nombre');
      setTimeout(() => {
        setErrorNombre('');
      }, 5000);
      return;

    }
    if (!apellidoP) {
      setErrorApellidoP('Ingrese su apellido paterno');
      setTimeout(() => {
        setErrorApellidoP('');
      }, 5000);
      return;

    }
    if (!apellidoM) {
      setErrorApellidoM('Ingrese su apellido materno');
      setTimeout(() => {
        setErrorApellidoM('');
      }, 5000);
      return;

    }
    if (!password) {
      setErrorPassword('Ingrese su contraseña');
      setTimeout(() => {
        setErrorPassword('');
      }, 5000);
      return;

    }
    if (!email) {
      setErrorEmail('Ingrese su email');
      setTimeout(() => {
        setErrorEmail('');
      }, 5000);
      return;
    }
    if (!telefono) {
      setErrorTelefono('Ingrese su telefono');
      setTimeout(() => {
        setErrorTelefono('');
      }, 5000);
      return;
    }
    else if (telefono.length > 10 || telefono.length < 10) {
      setErrorTelefono('Tu número telefónico debe tener 10 dígitos');
      setTimeout(() => {
        setErrorTelefono('');
      }, 5000);
      return;
    }
    else if (isNaN(telefono)) {
      setErrorTelefono('Tu número telefónico debe ser un número');
      setTimeout(() => {
        setErrorTelefono('');
      }, 5000);
      return;
    }
    if (!file) {
      setErrorFile('Ingrese su documento');
      setTimeout(() => {
        setErrorFile('');
      }, 5000);
      return;

    }


    try {
      console.log("file este", file);
      var formdata = new FormData();
      formdata.append("nombre", nombre);
      formdata.append("apellidoP", apellidoP);
      formdata.append("apellidoM", apellidoM);
      formdata.append("password", password);
      formdata.append("email", email);
      formdata.append("telefono", telefono);
      formdata.append("documento", file);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      const response = await fetch("http://iksadmin.iknesoft.in/iks-admin-back/iknesoftback/public/users/", requestOptions)
      const data = await response.json();
      console.log(data)

      if (data.api_token) {
        const action = {
          type: types.login,
          payload: {
            session: data,
            token: data.api_token,
          }
        }
        authAction(action);

        if (props.type === 'mensual') {
          navigate('/hosting/mensual')
        }
        else if (props.type === 'anual') {
          navigate('/hosting/anual')
        }
        console.log(data);
      }

      // setIsSuccessSubmit(data.success)
    } catch (e) {
      console.log('error enviando datos: ', e);
    }
  }

  return (
    <main>

    
      <div className='flex flex-col md:flex-row w-full'>

        <Back />
        <div className='flex-1 bg-white'>
          <h1 className='mt-10 mx-10 text-center text-3xl font-mono'>
            Registrate para poder acceder a nuestros servicios hosting <span className=''>{props.type}</span>
          </h1>
          <form onSubmit={handleSubmit} method="POST" className='min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '
            style={              { display: isSuccessSubmit ? 'none' : 'flex' }} >
            <div className=' flex flex-col w-full max-w-md'>
              <label htmlFor="nombre" className='text-sm font-medium text-black' ></label>
              <input type={'text'} id="nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                className='relative border border-gray-300 rounded-t-md p-1 text-base sm:text-sm h-10' placeholder='Nombre' />
              {errorNombre && <div className="alert text-red-500">{errorNombre} </div>}
              <label htmlFor="apellidoP" className='text-sm font-medium text-black'></label>
              <input type={'text'} id="apelllidoP" value={apellidoP} onChange={e => setApellidoP(e.target.value)}
                className='relative border border-gray-300  p-1 t sm:text-sm h-10' placeholder='Apellido paterno'
              />
              {
                errorApellidoP && <div className="alert text-red-500">{errorApellidoP}</div>
              }
              <label htmlFor="apellidoM" className='text-sm font-medium text-black'></label>
              <input type={'text'} id="apellidoM" value={apellidoM} onChange={e => setApellidoM(e.target.value)}
                className='relative border border-gray-300  p-1 text-base sm:text-sm h-10' placeholder='Apellido materno'
              />
              {
                errorApellidoM && <div className="alert text-red-500">{errorApellidoM}</div>
              }
              <label htmlFor="password" className='text-sm font-medium text-black'></label>
              <input type={'password'} id="password" value={password} onChange={e => setPassword(e.target.value)}
                className='relative border border-gray-300  p-1 text-base sm:text-sm h-10' placeholder='Contraseña'
              />
              {
                errorPassword && <div className="alert text-red-500">{errorPassword} </div>
              }
              <label htmlFor="email" className='text-sm font-medium text-black'></label>
              <input type={'email'} id="email" value={email} onChange={e => setEmail(e.target.value)}
                className='relative border border-gray-300  p-1 text-base sm:text-sm h-10' placeholder='Email'
              />
              {
                errorEmail && <div className="alert text-red-500">{errorEmail}</div>
              }
              <label htmlFor="telefono" className='text-sm font-medium text-black'></label>
              <input type={'text'} id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)}
                className='relative border border-gray-300 rounded-b-md p-1 text-base sm:text-sm h-10' placeholder='Telefono'
              />
              {
                errorTelefono && <div className="alert text-red-500">{errorTelefono}</div>
              }
              <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8 h-[324px]">
                <div className='bg-indigo-600 rounded-lg hover:bg-indigo-500 '>
                  <div className='flex flex-col text-center my-2'>
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
                      {file === "" ? "Sube tu constancia de situación fiscal" : file.name}
                    </div>
                  </div>
                </div>
              </div>
              {/* <input type={'file'} id="file" onChange={e => setFile(e.target.files[0])} /> */}
              <button type="submit" className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Registrarse</button>
            </div>


          </form>
        </div>

      
      </div>
    </main>


  )
}

export default Registro