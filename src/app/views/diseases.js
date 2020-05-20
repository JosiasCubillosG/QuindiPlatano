import React from 'react';
import Layout from '../components/Layout';
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
            if(res.data.status == 'success'){
                this.setState({
                    diseases: res.data.disease,
                    cargando: false
                })
                console.log(this.state.diseases)
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    detailDisease = (id) => {

        console.log('Id:',id)
        Axios(`/api/diseases/${id}`,{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.props.history.push("/options/diseases/detail")
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    render() {
        const {diseases, cargando} = this.state

        if(cargando){
            return 'Cargando...'
        }

        return (
            <div className="diseases-container">
                {
                    diseases.map(disease => {
                        return(
                            <Link className="disease disease-moko" to={`/options/diseases/${disease._id}`}>
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