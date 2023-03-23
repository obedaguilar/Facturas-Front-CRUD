import React from 'react'

const FooterHome = () => {
    return (
        <footer className="text-center text-green-500" style={{backgroundColor: 'blue',
          
        }}>
            <div className="text-center text-gray-700 p-4" style={{
                backgroundColor: 'rgb(30,30,30)',
                color: 'white',
                fontSize: '1rem',
                width: '100%',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                                        }}>
                © {new Date().getFullYear()}   <a className="text-gray-400" href="/"> Iknesoft. </a>Todos los derechos reservados <br/>
              
            </div>
        </footer>
    )
}

export default FooterHome