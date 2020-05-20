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
        if(this.props.location.state){
            Axios(`/api/lots/${this.props.match.params.id}`,{
                method: 'GET'
            })
            .then(res => {
                if(res.data.status == 'success'){
                    this.setState({
                        lot: res.data.lot,
                        cargando: false,
                    })
                    NotificationManager.info('Cultivo editado con exito','Cultivo editado')
                }else{
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                console.log(err)
            })
        }else{
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
    }

    deleteCrop = () => {
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
    }

    editCrop = () => {
        this.props.history.push({
            pathname: '/options/addCrop',
            state: {...this.state.lot}
        })
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
                    <p>{moment(lot.createdDate).format('dddd LL h:s a')}</p>
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
                        lot.tasks.map(task => {
                            if(task.state){
                                return(
                                    <div className="cropTaskDetail1">
                                        <h4>{task.name}</h4>
                                        <div className="check">
                                            <h6>Dentro de: {task.days}</h6>
                                            <div className="checkTaskTrue"></div>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="cropTaskDetail1">
                                        <h4>{task.name}</h4>
                                        <div className="check">
                                            <h6>Dentro de: {task.days}</h6>
                                            <div className="checkTaskFalse"></div>
                                        </div>
                                    </div>
                                )
                            }
                            
                        })
                    }
                </div>
                <NotificationContainer />
            </div>
        );
    }
}

export default DetailCrop;