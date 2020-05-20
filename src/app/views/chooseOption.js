import React from 'react'
import Layout from '../components/Layout'
import "./styles/chooseOption.css"
import {Link} from "react-router-dom"
import Context from '../Context'

class ChooseOption extends React.Component {
    render() {
        return (
            <div className="choose-container">
                <Link to="/options/diseases" className="sickOption">
                    <h2>Enfermedades</h2>
                </Link>

                <Link to="/options/accounting" className="accountingOption">
                    <h2>Contabilidad</h2>
                </Link>  
                <Link to="/options/crops" className="controlOption">
                    <h2>Control</h2>
                </Link>
            </div>
        )
    }
}

export default ChooseOption