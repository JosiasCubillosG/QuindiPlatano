import React from 'react';
import Layout from './Layout';
import "./styles/useful.css"
import Axios from 'axios';
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import {FaDollarSign} from 'react-icons/fa'

class Useful extends React.Component {

    state = {
        income: [],
        outlay: [],
    }

    getIncome = () => {
        Axios('/api/incomes',{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.setState({
                    income: res.data.income
                })
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
        })
        return 0
    }

    getOutlay = () => {
        console.log('Hola')
        Axios('/api/expenses',{
            method: 'GET'
        })
        .then(res => {
            console.log('Hola')
            if(res.data.status == 'success'){
                this.setState({
                    outlay: res.data.expense
                })                
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        this.getIncome()
        this.getOutlay()
    }

    getUseful = (income,outlay) => {
        var ingreso = 0
        var egreso = 0
    
        for (let index = 0; index < income.length; index++) {
            ingreso += income[index].value
        }

        for (let j = 0; j < outlay.length ; j++) {
            egreso -= outlay[j].value
        } 

        var utilidad = ingreso + egreso
        return utilidad
    }

    render() {

        const {income, outlay} = this.state


        return (
            <div className="useful-container">
                <div className="useful-title">
                    <h1>
                        Utilidad Actual
                    </h1>         
                </div>
                <div className="useful-value">
                    <FaDollarSign className="useful-icon" /> <p className="useful-value-p">{this.getUseful(income,outlay)}</p> 
                </div>
                <div className="useful-value">
                    <FaRegMoneyBillAlt className="useful-value-icon" />
                </div>
            </div>
        );
    }
}

export default Useful;