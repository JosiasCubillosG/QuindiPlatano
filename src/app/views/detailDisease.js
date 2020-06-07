import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import DemoCarousel from '../components/carousel';
import "./styles/detailDisease.css"
import Axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import enfermedad1 from "../../images/enfermedad1.jpeg"
import enfermedad2 from "../../images/Enfermedades.jpg"

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
            console.log(this.state)
            console.log(err)
        })
    }

    render() {
        const {disease, cargando, error} = this.state
        console.log(disease)
        if(cargando){
            return <Cargando />
        }

        if(error){
            return <Error />
        }

        return (   
            <div className="detailDisease-container">
                <div className="nameDisease">
                    <h2>{disease.name}</h2>
                </div>
                <div className="carouselDisease">
                    <Carousel 
                        showThumbs={false} 
                        infiniteLoop={true} 
                        showStatus={false}
                        width={"80%"}
                        autoPlay={true}
                        interval={5000}
                    >
                        <div>
                            <img src={enfermedad1}/>
                        </div>
                        <div>
                            <img src={enfermedad2} />
                        </div>
                        <div>
                            <img src={enfermedad1}/>
                        </div>
                    </Carousel>
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