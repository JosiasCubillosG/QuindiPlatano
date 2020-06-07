import React from 'react'
import {FaExclamation} from 'react-icons/fa'
import './styles/error.css'

const Error = () => {
    return(
        <div className="error">
            <div className="error__title">
                <FaExclamation className="error__title__icon" color="red" size={70}/>
                <h1>Ups ha ocurrido un error</h1>
            </div>
            <div className="error__description">
                <p>Ha sucedido un error, por favor vuelva a intentarlo más tarde.</p>
            </div>
        </div>
    )
}

export default Error