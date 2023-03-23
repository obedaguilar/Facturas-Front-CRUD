import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const LoginNaveMenu = () => {
    return (
        <div className="m-3 flex justify-end">
        <div className=' items-center justify-center  text-blue-600  hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
            <Link title="Regresar al inicio" to={'/'}>
                <i><FaSignOutAlt style={{
                fontSize: "2.5rem",
                textAlign: "center",

            }} />
                </i>
                {/* <span className='text-sm text-center'>Regresar</span> */}
            </Link>
        </div>
    </div>

    )
}

export default LoginNaveMenu