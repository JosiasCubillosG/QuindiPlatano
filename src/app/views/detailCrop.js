import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/detailCrop.css"
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')


class DetailCrop extends React.Component {

    state = {
        lot: [],
        cargando: true,
        error: false,
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
                this.setState({
                    error: true
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error: true
            })
            console.log(err)
        })
    }

    deleteCrop = () => {
        toast.error('CULTIVO ELIMINADO CON EXITO',{position: toast.POSITION.TOP_CENTER, autoClose:2000})
        setTimeout(() =>{
            Axios(`/api/lots/${this.state.lot._id}`,{
                method: 'DELETE'
            })
            .then(res=>{
                if(res.data.status == 'success'){
                    this.props.history.push({
                        pathname: "/options/crops",
                        state: {...this.state}
                    })
                }else{
                    this.setState({
                        error: true
                    })
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                this.setState({
                    error: true
                })
                console.log(err)
            })
        },2000)
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
        }else{
            task.state = true
            e.target.style.backgroundColor = "green"
            Axios(`/api/lots/${this.state.lot._id}`,{method: 'PUT', data:{...this.state.lot}})
        }
    }


    render() {

        const{lot,cargando,error} = this.state
        
        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
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
                                        <h6>Dentro de: {(moment(lot.createdDate).add(task.days,'m')).diff(moment().format(),'minutes') > 0 ? (moment(lot.createdDate).add(task.days,'m')).diff(moment().format(),'minutes') : 0} dias</h6>
                                        <div className="checkTaskFalse" style={colorTask} onClick={(e) => this.changeStatus(e,task)}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default DetailCrop;