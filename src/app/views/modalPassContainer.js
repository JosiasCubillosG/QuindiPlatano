import React from "react";
import {createPortal} from "react-dom";

class ModalPassContainer extends React.Component {
    render(){
        return createPortal(
            this.props.children,
            document.getElementById("modalPassContainer")
        )
    }
}

export default ModalPassContainer;