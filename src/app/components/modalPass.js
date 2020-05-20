import React from "react";
import "./styles/modalPass.css";

const ModalPass = (props) => {
    return(
        <div className="modalPass">
            <audio src='https://quindiplatanos.s3.amazonaws.com/5ec17266e345f31cbcf6eaec-alarma.mp3' controls></audio>
            <button  
                onClick={props.handleClick} 
                className="modalPass-close"
            />
        </div>
    )
}

export default ModalPass;