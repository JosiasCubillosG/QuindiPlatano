import React from 'react';
import Layout from '../components/Layout';
import "./styles/accounting.css"
import { Link } from "react-router-dom"

class Accounting extends React.Component {
    render() {
        return (
            <div className="accounting-container">
                <Link to="/options/accounting/income" className="income">
                    <h3>Ingresos</h3>
                </Link>
                <Link to="/options/accounting/outlay" className="outlay">
                    <h3>Gastos</h3>
                </Link>
                <Link to="/options/accounting/useful" className="grossProfit">
                    <h3>Utilidad</h3>
                </Link>
            </div>
        );
    }
}

export default Accounting;