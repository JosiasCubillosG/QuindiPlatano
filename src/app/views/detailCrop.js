import React from 'react';
import Layout from '../components/Layout';
import "./styles/detailCrop.css"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import '../../../node_modules/react-notifications/lib/notifications.css'
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')


class DetailCrop extends React.Component {

    state = {
        lot: [],
        cargando: true,
        error: false,
        edited: false,
    }

    componentDidMount = () => {
            this.getCrop()

    }

    getCrop = () => {
        Axios(`/api/lots/${this.props.match.params.id}`,{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.setState({
                    lot: res.data.lot,
                    cargando: false,
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

    deleteCrop = () => {
        NotificationManager.error('Cultivo eliminado con exito','Cultivo eliminado',2000)
        setTimeout(() =>{
            Axios(`/api/lots/${this.state.lot._id}`,{
                method: 'DELETE'
            })
            .then(res=>{
                if(res.data.status == 'success'){
                    this.setState({
                        edited: true
                    })
                    this.props.history.push({
                        pathname: "/options/crops",
                        state: {...this.state}
                    })
                }else{
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                console.log(err)
            })
        },1000)
    }

    editCrop = () => {
        this.props.history.push({
            pathname: '/options/addCrop',
            state: {...this.state.lot}
        })
    }

    changeStatus = (e,task) => {
        if(task.state){
            task.state = false
            e.target.style.backgroundColor = "red"
            Axios(`/api/lots/${this.state.lot._id}`,{method: 'PUT', data:{...this.state.lot}})
                .then(res =>{
                    console.log(res)
                    console.log('BIEN')
                })
                .catch(err =>{
                    console.log(err)
                    console.log('MALL')
                })
        }else{
            task.state = true
            e.target.style.backgroundColor = "green"
            Axios(`/api/lots/${this.state.lot._id}`,{method: 'PUT', data:{...this.state.lot}})
                .then(res =>{
                    console.log(res)
                    console.log('BIEN')
                })
                .catch(err =>{
                    console.log(err)
                    console.log('MALL')
                })
        }
    }


    render() {

        const{lot,cargando,error} = this.state
        
        if(cargando){
            return 'Cargando...'
        }

        return (
            <div className="detailCrop-container">
                <div className="detailCrop">
                    <h2>{lot.name}</h2>
                    <p>Numero de plantas: {lot.plants}</p>
                    <p>{moment(lot.createdDate).format('LLLL')}</p>
                </div>
                <div className="optionsCrop">
                    <div className="editCrop">
                        <button onClick={this.editCrop}>EDITAR</button>
                    </div>
                    <div className="deleteCrop">
                        <button onClick={this.deleteCrop}>ELIMINAR</button>
                    </div>
                </div>

                <div className="cropTasks">
                    <h3>Tareas:</h3>
                    {
                        lot.tasks.map(task =>{
                            if(task.state){
                                var colorTask = {
                                    backgroundColor: 'green'
                                }
                            }else{
                                var colorTask = {
                                    backgroundColor: 'red'
                                }
                            }
                            const Image = {
                                backgroundImage: 'url(' + task.imageURL + ')',
                              };
                            return(
                                <div className="cropTaskDetail" style={Image}>
                                    <h4>{task.name}</h4>
                                    <div className="check">
                                        <h6>Dentro de: {task.days} dias</h6>
                                        <div className="checkTaskFalse" style={colorTask} onClick={(e) => this.changeStatus(e,task)}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default DetailCrop;