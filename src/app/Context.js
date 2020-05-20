import React, {createContext, useState, Children} from 'react'
import Axios from 'axios'
const Context = createContext()



const Provider = ({children}) => {
    const [isAuth, setIsAuth] = useState(()=>{
        return window.sessionStorage.getItem('token')
    })
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")


    const val =  {
        isAuth,
        email,
        password,
        changeEmail: (e) => {
            console.log()
            setEmail(e.target.value)
        } ,
        changePassword: (e) => {
            setpassword(e.target.value)
        },
        removeAuth: () =>{
            setIsAuth(!isAuth)
            window.sessionStorage.removeItem('token')
        },
        submit: (e) => {
            e.preventDefault()
            Axios('/api/users/login',{
                method: 'POST',
                data: {email, password}
            })
            .then(res => { 
                console.log(res)
                if(res.data.status === "success") {
                    setIsAuth(!isAuth)
                    window.sessionStorage.setItem('token',res.data.token)
                }else{
                    const error = new Error(res.error)
                    console.log('ee')
                    throw error
                }
            })
            .catch(err => {
                console.error(err)
                alert('Error iniciando sesión')
            });
        }
    }

    return (
        <Context.Provider value={val} >
            {children}
        </Context.Provider>
    )
}

export default {
    Provider,
    Consumer: Context.Consumer
}