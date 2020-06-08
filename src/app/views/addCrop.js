import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/addCrop.css"
import Axios from 'axios';
import {GiFarmer,GiFarmTractor} from 'react-icons/gi'
import { ToastContainer, toast } from 'react-toastify';




class AddCrop extends React.Component {

    state = {
        name: '',
        plants: '',
        id: '',
        cargando: true,
        error: false
    }

    componentDidMount = () => {
        this.setState({cargando:false})
        if(this.props.location.state){
            this.setState({
                name: this.props.location.state.name,
                plants: this.props.location.state.plants,
                id: this.props.location.state._id,
            })
        }
    }

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        })
    }

    addCrop = (e) => {
        e.preventDefault()
        if(this.state.plants == 0 || this.state.name.trim() == '' || Math.sign(this.state.plants) == -1){
            toast.info('DIGITE UN NÚMERO CORRECTO DE PLANTAS',{position: toast.POSITION.TOP_CENTER})
        }else{
            if(this.state.id){
                toast.warning('CULTIVO EDITADO CON EXITO',{position: toast.POSITION.TOP_CENTER, autoClose: 2000})
                setTimeout(()=>{
                    Axios(`/api/lots/${this.state.id}`,{
                        method: 'PUT',
                        data: {...this.state}
                    })
                    .then(res => {
                        if(res.data.status == 'success'){  
                            this.props.history.push({
                                pathname: `/options/detailCrop/${this.state.id}`,
                                state: {...this.state}
                            })
                        }else{
                            this.setState({
                                error: true,
                                cargando: false
                            })
                            const error = new Error(res.error)
                            throw error
                        }
                    })
                    .catch(err =>{
                        this.setState({
                            error: true,
                            cargando: false
                        })
                        console.log(err)
                    })    
                },2000)
            }else{
                toast.success('CULTIVO AGREGADO CON EXITO',{position: toast.POSITION.TOP_CENTER, autoClose:2000})
                setTimeout(()=>{
                    Axios('/api/lots',{
                        method: 'POST',
                        data: {...this.state}
                    })
                    .then(res=>{
                        console.log('Cultivo creado')
                        if(res.data.status === 'success') {
                            this.props.history.push({
                                pathname: '/options/crops',
                                state: {...this.state}
                            })
                        }else{
                            this.setState({
                                error: true,
                                cargando: false
                            })
                            const error = new Error(res.error)
                            throw error
                        }
                    })
                    .catch(err =>{
                        this.setState({
                            error: true,
                            cargando: false
                        })
                        console.log(err)
                    })
                }, 2000) 
            }
        }
    }

    getTitle = () => {
        return this.state.id ? 'Editar Cultivo' : 'Añadir Cultivo'
    }

    render() {

        if(this.state.cargando){
            return <Cargando />
        }

        if(this.state.error){
            return <Error />
        }

        return (
            <div className="addCrop-container">
                <h2 className="addCrop-title">{this.getTitle()}</h2>
                <form className="addCrop-form" onSubmit={this.addCrop}>
                    <div className="group-name">
                        <div className="group-name-icon">
                            <GiFarmer className="addCrop-iconName" />
                        </div>
                        
                        <div className="group-name-input">
                            <label className="addCrop-name">Nombre del cultivo</label>       
                            <input className="nameCrop" placeholder="Digite el nombre del cultivo" type="text" onChange={this.handleInputChange} value={this.state.name} name="name" required ></input>
                        </div>
                    </div>
                    
                    <div className="group-numberPlants">
                        <div className="group-numberPlants-icon">
                            <GiFarmTractor className="addCrop-iconPlants" />
                        </div>
                        
                        <div className="group-numberPlants-input">
                            <label className="addCrop-numberPlants">Numero de plantas</label>    
                            <input className="numberPlants" placeholder="Digite el número de plantas" type="number" onChange={this.handleInputChange} value={this.state.plants}  name="plants" required></input>
                        </div>
                        
                    </div>
                                    
                    <button type="submit" value="Submit" className="add-btn">{this.getTitle()}</button>
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default AddCrop;