import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/useful.css"
import Axios from 'axios';
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import {FaDollarSign} from 'react-icons/fa'
import Numeral from 'numeral'

class Useful extends React.Component {

    state = {
        income: [],
        outlay: [],
        cargando: true,
        error: false
    }

    getIncome = () => {
        Axios('/api/incomes',{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.setState({
                    income: res.data.income,
                    cargando: false
                })
            }else{
                this.setState({
                    error:true,
                    cargando: false
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error:true,
                cargando: false
            })
            console.log(err)
        })
        return 0
    }

    getOutlay = () => {
        Axios('/api/expenses',{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.setState({
                    outlay: res.data.expense,
                    cargando: false
                })                
            }else{
                this.setState({
                    error:true,
                    cargando: false
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error:true,
                cargando: false
            })
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

        const {income, outlay, cargando, error} = this.state

        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (
            <div className="useful-container">
                <div className="useful-title">
                    <h1>
                        Utilidad Actual
                    </h1>         
                </div>
                <div className="useful-value">
                    <FaDollarSign className="useful-icon" /> <p className="useful-value-p">{Numeral(this.getUseful(income,outlay)).format('0,0')}</p> 
                </div>
                <div className="useful-value">
                    <FaRegMoneyBillAlt className="useful-value-icon" />
                </div>
            </div>
        );
    }
}

export default Useful;