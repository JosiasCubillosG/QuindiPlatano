import React from "react";
import "./styles/recoverpass.css";
import {Link} from "react-router-dom"
import {MdPhoneAndroid} from 'react-icons/md'


const Recover = (props) => {
    return(
        <div className="recover-container">
            <div className="recover">
                <h2>Recuperar Contraseña</h2>

                <div className="group-recover">
                    <div className="group-recover-icon">
                        <MdPhoneAndroid className="recover-icon" />
                    </div>
                    <div className="group-recover-input">
                        <input className="recover-pass" type="text" name="recover" placeholder="Número telefonico" />
                    </div>
                </div>
                
                <Link to="/">
                    <button onClick={props.recoverPass} className="recover-btn">Solicitar recuperación</button>
                </Link>
            </div>
        </div>
    )
}

export default Recover;