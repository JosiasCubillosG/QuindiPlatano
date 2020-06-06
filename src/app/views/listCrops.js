import React from 'react';
import Layout from '../components/Layout';
import "./styles/listCrops.css"
import {Link} from "react-router-dom"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import '../../../node_modules/react-notifications/lib/notifications.css'
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')



class ListCrops extends React.Component {

    state = {
        lots: [],
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

    render() {
        const {lots} = this.state
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
                <NotificationContainer />
            </div>
            
        );
    }
}

export default ListCrops;