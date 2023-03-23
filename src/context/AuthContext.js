import { useContext, createContext, useEffect, useReducer } from "react"
import { types } from "../models/typeAuth"

const key = 'AuthTS'

const init = () => {
    return JSON.parse(localStorage.getItem(key)) || { logged: false }
}

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }

        case types.logout:
            return {
                logged: false
            }
            

        default:
            return state
    }

}

const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [auth, authAction] = useReducer(authReducer, {}, init)

    useEffect(() => {
        if (!auth) return
        localStorage.setItem(key, JSON.stringify(auth))
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, authAction }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)