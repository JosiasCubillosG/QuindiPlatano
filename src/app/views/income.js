import React from 'react';
import Layout from '../components/Layout';
import "./styles/income.css"
import Axios from 'axios';
import {FiEdit} from 'react-icons/fi'
import {MdDeleteForever} from 'react-icons/md'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import '../../../node_modules/react-notifications/lib/notifications.css'

class Income extends React.Component {

    state = {
        value: '',
        description: '',
        id: '',
        incomes: [],
    }

    componentDidMount = () => {
        this.addIncomes()
    }

    addIncomes = () => {
        Axios('/api/incomes',{
            method: 'GET'
        })
        .then(res=>{
            if(res.data.status === 'success') {
                this.setState({
                    incomes: res.data.income
                })
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }


    addValues = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    addIncome = (e) => {
        e.preventDefault()
        if(this.state.value == 0 || this.state.description.trim() == '' || Math.sign(this.state.value) == -1){
            NotificationManager.warning('Digite algún dato','Datos vacios')

        }else{
            if(this.state.id){
                Axios(`/api/incomes/${this.state.id}`,{
                    method: 'PUT',
                    data: {...this.state}
                })
                .then(res=>{
                    if(res.data.status === 'success') {
                        NotificationManager.info('El ingreso se ha editado con exito', 'ingreso editado')
                        this.setState({
                            value: '',
                            description: '',
                            id: ''
                        })
                        this.addIncomes()
                        
                    }else{
                        const error = new Error(res.error)
                        throw error
                    }
                })
                .catch(err =>{
                    console.log(err)
                })

            }else{
                Axios('/api/incomes',{
                    method: 'POST',
                    data: {...this.state}
                })
                .then(res=>{
                    if(res.data.status === 'success') {
                        this.setState({
                            value: '',
                            description: '',
                            id: ''
                        })
                        NotificationManager.info('El ingreso se ha creado con exito', 'Ingreso creado')
                        this.addIncomes()
                    }else{
                        const error = new Error(res.error)
                        throw error
                    }
                })
                .catch(err =>{
                    console.log(err)
                })
            }
        }
    }

    deleteIncome = (id) => {
        Axios(`/api/incomes/${id}`,{
            method: 'DELETE'
        })
        .then(res =>{
            if(res.data.status == 'success'){
                NotificationManager.error('El ingreso se ha eliminado', 'Ingreso eliminado')
                this.addIncomes()
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    editIncome = (id) => {
        Axios(`/api/incomes/${id}`,{
            method: 'GET'
        })
        .then(res =>{
            if(res.data.status == 'success'){
                this.setState({
                    value: res.data.income.value,
                    description: res.data.income.description,
                    id: res.data.income._id
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

    totalValue = (total) =>{
        this.state.incomes.map(income => {
            total += income.value
        })

        return total
    }

    render() {
        const {incomes} = this.state
        var total = 0
       
        return (
            <div className="income-container">
                <form onSubmit={this.addIncome} className='addIncome'>

                    <div className='IncomeGroup'>
                        <label className="addIncome-value">Valor</label>
                        <input className="valueIncome" onChange={this.addValues} value={this.state.value} type="number" name="value" required></input>
                    </div>   
    
                    <textarea className="descriptionIncome" onChange={this.addValues} value={this.state.description} rows="5" cols="26" name="description" placeholder="Descripción del ingreso" required ></textarea>

                    <div className="incomeBtn">
                        <button type="submit">Agregar</button>
                    </div>
                </form>
                <div className="incomeTable-container">
                    <h3 className="total">
                        Ingreso Total: ${this.totalValue(total)}
                    </h3>
                    <table className="incomeTable">
                        <tr>
                            <th className="th-name">Nombre</th>
                            <th className="th-valor">Valor</th>
                        </tr>
                        {
                            incomes.map(income => {
                                return(
                                    <tr>
                                        <td className="th-name">{income.description}</td>
                                        <td className="th-valor">{income.value}</td>
                                        <td className="th-valor">
                                            <FiEdit onClick={()=>this.editIncome(income._id)} className="editIncome" />
                                            <MdDeleteForever onClick={()=>this.deleteIncome(income._id)} className="deleteIncome" />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default Income;