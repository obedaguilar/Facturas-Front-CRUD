import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'


const ButtonBack = () => {
    return (
        <div className=''>
            <Link to='/'>
                <span className='  text-blue-500 hover:text-blue-400 font-bold py-2 px-4 rounded inline-flex items-center '> <FaArrowLeft className='mx-2'/>Regresar</span>
            </Link>
        </div>
    )
}

export default ButtonBack