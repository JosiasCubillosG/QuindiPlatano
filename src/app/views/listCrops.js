import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/listCrops.css"
import {Link} from "react-router-dom"
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')



class ListCrops extends React.Component {

    state = {
        lots: [],
        cargando: true,
        error: false
    }

    componentDidMount = () => {
        this.getCrops()
    }

    getCrops = () => {
        Axios('/api/lots',{
            method: 'GET'
        })
        .then(res=>{
            if(res.data.status === 'success') {
                this.setState({
                    lots: res.data.lots,
                    cargando: false
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
    }

    render() {
        const {lots,cargando,error} = this.state

        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (
            <div className="listCrops">
                <div className="listCrops-container">
                    {   
                        lots.length > 0 ?
                            lots.map(lot => {
                                return(
                                    <Link to={`/options/detailCrop/${lot._id}`} className="crop">
                                        <div className="crop-detail">
                                            <h3>{lot.name}</h3>
                                            <p>{lot.plants} plantas</p>
                                            <p>{moment(lot.createdDate).format('DD/MM/YYYY')}</p>
                                        </div>
                                    </Link>
                                )
                            })
                            :
                            <h3 className="ceroCrops">No hay cultivos</h3>
                    }
                </div>    
                
                <Link to="/options/addCrop" className="addCrop">
                    <button className="btnAddCrop">Añadir cultivo</button>
                </Link>
            </div>
            
        );
    }
}

export default ListCrops;