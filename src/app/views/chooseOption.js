import React from 'react'
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/chooseOption.css"
import {Link} from "react-router-dom"
import Axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

class ChooseOption extends React.Component {
    componentDidMount = async() => {
        try {
            const response = await Axios('/api/lots')
            // console.log(response.data.lots)
            response.data.lots.map(lot => {      
                lot.tasks.forEach((task,index) => {
                    // console.log(task)
                    if(moment(lot.createdDate).add(task.days, 'minutes').format() <= moment().format() && !task.state){
                        // const lotData = Object.assign({},lot)
                        // lotData.tasks[index].state = true
                        // console.log(lotData)
                        // const status = Axios(`/api/lots/${lot._id}`,{method: 'PUT', data:{lotData}})
                        const t =  Axios('/api/pushNotifications/newNotification',{method:'POST',data: {message:task.name,imageNotification:task.imageURL, url: lot._id}})
                    }
                })
            })
        }catch(error){
            console.log(error)
        }
    }

    render() {
        return (
            <div className="choose-container">
                <Link to="/options/diseases" className="sickOption">
                    <h2>Enfermedades</h2>
                </Link>

                <Link to="/options/accounting" className="accountingOption">
                    <h2>Contabilidad</h2>
                </Link>  
                <Link to="/options/crops" className="controlOption">
                    <h2>Control</h2>
                </Link>
            </div>
        )
    }
}

export default ChooseOption