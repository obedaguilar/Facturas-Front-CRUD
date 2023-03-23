import { useState } from 'react';
import { useAuth } from '../context/authContext';


import React from 'react'

const useLogin = () => {


    const { loginAction } = useAuth();
    const [loading, setLoading] = useState(false);


    const handlelogin = async (values) => {
        setLoading(true);

        try {

            const response = await api().post('loginUser').sendJson(
                {
                    ...values,

                })
            console.log(response)
            const result = await response.json();

            setLoading(false);

            if (result.status === 200) {
                successAlert('hola', 'bienvenido')
                loginAction(
                    {
                        type: 'sign',
                        data: {
                            user: result,
                            token: result.token
                        }


                    })
                return true
            } else {
                errorAlert('Error', result.message)
                return false
            }
        } catch (error) {
            console.log(error)
            errorAlert()
            setLoading(false);

        }

        return false

    }
    return { handlelogin, loading }
}

export default useLogin