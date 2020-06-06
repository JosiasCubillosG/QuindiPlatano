import React from 'react';
import Layout from '../components/Layout';
import {Link, withRouter} from 'react-router-dom'
import "./styles/addCrop.css"
import Axios from 'axios';
import {GiFarmer,GiFarmTractor} from 'react-icons/gi'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import '../../../node_modules/react-notifications/lib/notifications.css'




class AddCrop extends React.Component {

    state = {
        name: '',
        plants: '',
        id: '',
    }

    componentDidMount = () => {
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
            NotificationManager.warning('Digite algún dato','Datos vacios',2000)
        }else{
            if(this.state.id){
                NotificationManager.info('Cultivo editado con exito','Cultivo editado',2000)
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
                            const error = new Error(res.error)
                            throw error
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })    
                },1000)
            }else{
                NotificationManager.info('Cultivo agregado con exito','Cultivo agregado',2000)
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
                            const error = new Error(res.error)
                            throw error
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                }, 1000) 
            }
        }
    }

    getTitle = () => {
        return this.state.id ? 'Editar Cultivo' : 'Añadir Cultivo'
    }

    render() {
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
                <NotificationContainer />
            </div>
        );
    }
}

export default AddCrop;