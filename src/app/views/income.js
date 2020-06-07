import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/income.css"
import Axios from 'axios';
import {FiEdit} from 'react-icons/fi'
import {MdDeleteForever} from 'react-icons/md'
import {RiNumbersLine} from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import Numeral from 'numeral'

class Income extends React.Component {

    state = {
        value: '',
        description: '',
        id: '',
        incomes: [],
        cargando: true,
        error: false
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
                    incomes: res.data.income,
                    cargando:false
                })
            }else{
                this.setState({
                    error:true
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err =>{
            this.setState({
                error:true
            })
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
            toast.info('DIGITE ALGÚN DATO',{position: toast.POSITION.TOP_CENTER})

        }else{
            if(this.state.id){
                Axios(`/api/incomes/${this.state.id}`,{
                    method: 'PUT',
                    data: {...this.state}
                })
                .then(res=>{
                    if(res.data.status === 'success') {
                        toast.warning('INGRESO EDITADO CON EXITO',{position: toast.POSITION.TOP_CENTER})
                        this.setState({
                            value: '',
                            description: '',
                            id: '',
                            cargando: false
                        })
                        this.addIncomes()
                        
                    }else{
                        this.setState({
                            error:true
                        })
                        const error = new Error(res.error)
                        throw error
                    }
                })
                .catch(err =>{
                    this.setState({
                        error:true
                    })
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
                            id: '',
                            cargando: false
                        })
                        toast.success('INGRESO CREADO CON EXITO',{position: toast.POSITION.TOP_CENTER})
                        this.addIncomes()
                    }else{
                        this.setState({
                            error:true
                        })
                        const error = new Error(res.error)
                        throw error
                    }
                })
                .catch(err =>{
                    this.setState({
                        error:true
                    })
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
                toast.error('INGRESO ELIMINADO',{position: toast.POSITION.TOP_CENTER})
                this.addIncomes()
            }else{
                this.setState({
                    error:true
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error:true
            })
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
                    id: res.data.income._id,
                    cargando: false
                })
            }else{
                this.setState({
                    error:true
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error:true
            })
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
        const {incomes,cargando,error} = this.state
        var total = 0
       
        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (
            <React.Fragment>
                <div className="incomeTitleGroup">
                    <h1>Ingresos</h1>
                    <RiNumbersLine className="incomeIcon" />
                </div>
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
                            Ingreso Total: {Numeral(this.totalValue(total)).format('$0,0')}
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
                                            <td className="th-valor">{Numeral(income.value).format('$0,0')}</td>
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
                    <ToastContainer />
                </div>
            </React.Fragment>
        );
    }
}

export default Income;