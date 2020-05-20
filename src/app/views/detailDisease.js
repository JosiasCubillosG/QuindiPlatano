import React from 'react';
import Layout from '../components/Layout';
import DemoCarousel from '../components/carousel';
import "./styles/detailDisease.css"
import Axios from 'axios';

class DetailDisease extends React.Component {

    state = {
        disease: [],
        cargando: true,
        error: false,
    }

    componentDidMount = () => {
        Axios(`/api/diseases/${this.props.match.params.id}`,{
            method: 'GET'
        })
        .then(res => {
            if(res.data.status == 'success'){
                this.setState({
                    disease: res.data.disease,
                    cargando: false
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

    render() {
        const {disease, cargando} = this.state
        console.log(disease)
        if(cargando){
            return 'Cargando...'
        }

        return (   
            <div className="detailDisease-container">
                <div className="nameDisease">
                    <h2>{disease.name}</h2>
                </div>
                <div className="carouselDisease">
                    <DemoCarousel />
                </div>
                <div className="symptomatology">
                    <h3>Sintomatologia</h3>
                    <p>{disease.symptomatology}</p>
                </div>
                <div className="treatment">
                    <h3>Tratamiento</h3>
                    <p>{disease.treatment}</p>
                </div>
                <div className="contactSpecialize">
                    <a className="btnContact" href="https://api.whatsapp.com/send?phone=573186337855&text=Hola,%20tengo%20un%20inconveniente." target="_blank">Contactar especialista</a>
                </div>
            </div>    
        );
    }
}

export default DetailDisease;