import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/diseases.css"
import { Link } from "react-router-dom"
import Axios from 'axios';

class Diseases extends React.Component {

    state = {
        diseases: [],
        cargando: true,
        error: false,
    }

    componentDidMount = () => {
        Axios('/api/diseases',{
            method: 'GET'
        })
        .then(res => {
            console.log(res.data)
            if(res.data.status == 'success'){
                this.setState({
                    diseases: res.data.disease,
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
        .catch(err => {
            this.setState({
                error: true,
                cargando: false
            })
            console.log(err)
        })
    }

    detailDisease = (id) => {
        Axios(`/api/diseases/${id}`,{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.props.history.push("/options/diseases/detail")
            }else{
                this.setState({
                    error: true,
                    cargando: false
                })
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            this.setState({
                error: true,
                cargando: false
            })
            console.log(err)
        })
    }
    

    render() {
        const {diseases, cargando,error} = this.state
        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (
            <div className="diseases-container">
                {
                    diseases.map(disease => {
                        const Image = {
                            backgroundImage: 'url(' + disease.imagesURL[0] + ')',
                        }
                        return(
                            <Link className="disease disease-moko" to={`/options/diseases/${disease._id}`} style={Image} >
                                <h3>{disease.name}</h3>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}

export default Diseases;