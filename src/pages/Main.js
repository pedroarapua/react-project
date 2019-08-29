import React, { Component } from 'react';
import logo from '../images/logo.svg';
import {IconContext} from "react-icons";
import {FaCircleNotch} from "react-icons/fa";
import './Main.css';

export default class Main extends Component {
    
    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/busca');
        }, 3000);
    };


    render() {
        return (
            <div className="flex-box main-wrapper">
                <div className="container-fluid">
                    <div className="content-block">
                        <img src={logo} alt="Marvel: Listagem de Heróis" width={255} height={102} />
                        <h1 className="main-title">Listagem de Heróis</h1>
                    </div>
                    <div className="content-block margin-40">
                        <IconContext.Provider value={{className: "load-icon" }}>
                            <FaCircleNotch />
                        </IconContext.Provider>
                        <div>Carregando. Aguarde...</div>
                    </div>
                </div>
            </div> 
        );
    }
}
