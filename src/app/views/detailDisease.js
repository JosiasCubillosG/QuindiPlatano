import React from 'react';
import Cargando from '../components/Cargando'
import Error from '../components/Error'
import "./styles/detailDisease.css"
import Axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

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
            console.log(this.state)
            console.log(err)
        })
    }

    render() {
        const {disease, cargando, error} = this.state
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
                            <img src={this.state.disease.imagesURL[1]}/>
                        </div>
                        <div>
                            <img src={this.state.disease.imagesURL[2]}/>
                        </div>
                        <div>
                            <img src={this.state.disease.imagesURL[3]}/>
                        </div>
                        <div>
                            <img src={this.state.disease.imagesURL[4]}/>
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