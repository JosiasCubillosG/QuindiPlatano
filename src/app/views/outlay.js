import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/income.css"
import Axios from 'axios';
import {FiEdit} from 'react-icons/fi'
import {MdDeleteForever} from 'react-icons/md'
import {RiNumbersLine} from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';



class Outlay extends React.Component {

    state = {
        value: '',
        description: '',
        id: '',
        outlays: [],
        cargando: true,
        error: false
    }

    componentDidMount = () => {
        this.addOutlays()
    }

    addOutlays = () => {
        Axios('/api/expenses',{
            method: 'GET'
        })
        .then(res=>{
            if(res.data.status === 'success') {
                this.setState({
                    outlays: res.data.expense,
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

    addOutlay = (e) => {
        e.preventDefault()
        if(this.state.value == 0 || this.state.description.trim() == '' || Math.sign(this.state.value) == -1){
            toast.info('DIGITE ALGÚN DATO',{position: toast.POSITION.TOP_CENTER})
        }else{
            if(this.state.id){
                Axios(`/api/expenses/${this.state.id}`,{
                    method: 'PUT',
                    data: {...this.state}
                })
                .then(res=>{
                    if(res.data.status === 'success') {
                        toast.warning('GASTO EDITADO CON EXITO',{position: toast.POSITION.TOP_CENTER})
                        this.setState({
                            value: '',
                            description: '',
                            id: '',
                            cargando: false
                        })
                        this.addOutlays()
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
                Axios('/api/expenses',{
                    method: 'POST',
                    data: {...this.state}
                })
                .then(res=>{
                    if(res.data.status === 'success') {
                        toast.success('GASTO CREADO CON EXITO',{position: toast.POSITION.TOP_CENTER})
                        this.addOutlays()
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

    deleteOutlay = (id) => {
        Axios(`/api/expenses/${id}`,{
            method: 'DELETE'
        })
        .then(res =>{
            if(res.data.status == 'success'){
                toast.error('GASTO ELIMINADO',{position: toast.POSITION.TOP_CENTER})
                this.addOutlays()
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

    editOutlay = (id) => {
        Axios(`/api/expenses/${id}`,{
            method: 'GET'
        })
        .then(res =>{
            if(res.data.status == 'success'){
                this.setState({
                    value: res.data.expense.value,
                    description: res.data.expense.description,
                    id: res.data.expense._id,
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
        this.state.outlays.map(outlay => {
            total += outlay.value
        })

        return total
    }


    render() {
        var total = 0
        const {outlays,cargando,error} = this.state

        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (
            <React.Fragment>
                <div className="outlayTitleGroup">
                    <h1>Gastos</h1>
                    <RiNumbersLine className="outlayIcon" />
                </div>
                <div className="income-container">
                    <form className='addIncome'>

                        <div className='IncomeGroup'>
                            <label className="addIncome-value">Valor</label>
                            <input className="valueIncome" onChange={this.addValues} value={this.state.value} type="number" name="value" required></input>
                        </div>   

                        <textarea className="descriptionIncome" onChange={this.addValues} value={this.state.description} rows="5" cols="26" name="description" placeholder="Descripción del gasto" required ></textarea>

                        <div className="incomeBtn">
                            <button onClick={this.addOutlay}>Agregar</button>
                        </div>
                    </form>
                    
                    <div className="incomeTable-container">
                        <h3 className="total">
                            Gasto Total: ${this.totalValue(total)}
                        </h3>
                        <table className="incomeTable">
                            <tr>
                                <th className="th-name">Nombre</th>
                                <th className="th-valor">Valor</th>
                            </tr>
                            {
                                outlays.map(outlay => {
                                    total += outlay.value
                                    return(
                                        <tr>
                                            <td className="th-name">{outlay.description}</td>
                                            <td className="th-valor">{outlay.value}</td>
                                            <td className="th-valor">
                                                <FiEdit onClick={()=>this.editOutlay(outlay._id)} className="editIncome" />
                                                <MdDeleteForever onClick={()=>this.deleteOutlay(outlay._id)} className="deleteIncome" />
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

export default Outlay;