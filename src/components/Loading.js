import React, { Component } from 'react';
import {IconContext} from "react-icons";
import {FaCircleNotch} from "react-icons/fa";
import './Loading.css';


export default class components extends Component {
    render() {
        return (
            <div className="loading-wrapper">
                <IconContext.Provider value={{className: "loading-spin" }}>
                    <FaCircleNotch />
                </IconContext.Provider>
                <span>Carregando informações. Aguarde...</span>
            </div>
        );
    }
}
