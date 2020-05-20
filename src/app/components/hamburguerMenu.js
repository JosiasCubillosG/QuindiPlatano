import React from "react"
import "./styles/hamburguerMenu.css"
import {Link} from "react-router-dom"

function MenuHamburguer(){
    return(
        <Link to="/menu" className="menuHamburguer-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"  viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </Link>
    )
}

export default MenuHamburguer;