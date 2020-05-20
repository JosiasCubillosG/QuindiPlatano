import React from 'react';
import Layout from '../components/Layout';
import "./styles/menu.css"
import {Link} from "react-router-dom"
import Context from '../Context'

class Menu extends React.Component {
    render() {
        return(
            <Context.Consumer>
                {
                    ({removeAuth}) => {
                        return (
                            <div className="menu-container">
                                <Link to="/" className="menuHome">
                                    <h2>Inicio</h2>
                                </Link>
                                <Link to="/options/diseases" className="menuDiseases">
                                    <h2>Enfermedades</h2>
                                </Link>
                                <Link to="/options/accounting" className="menuAccounting">
                                    <h2>Contabilidad</h2>
                                </Link>
                                <Link to="/options/crops" className="menuControl">
                                    <h2>Control</h2>
                                </Link>
                                <Link onClick={removeAuth} to="/" className="menuLogOut">
                                    <h2>Cerrar Sesión</h2>
                                </Link>
                            </div>
                        );
                    }
                }
            </Context.Consumer>
        )
    }
}

export default Menu;