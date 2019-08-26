import React, { Component } from 'react';
import Menu from '../components/Menu';
import notFoundImg from '../images/404.png';
import './NotFound.css';


export default class NotFound extends Component {

    handleButtonClick = e => {
        e.preventDefault();
        this.props.history.push('/busca');
    }

    render() {
        return (
            <div className="flex-box not-found-wrapper">
                <div className="container">
                    <img src={notFoundImg} className="not-found-image" alt="Página não encontrada" title="Página não encontrada" />
                    <h1 className="not-found-title">404 - Página não encontrada</h1>
                    <p className="not-found-info">Para manter o equilíbrio do universo, esta página foi removida.</p>
                    <button type="button" className="btn btn-info" onClick={this.handleButtonClick}>Voltar para a Busca</button>
                </div>
                <Menu />
            </div>
        );
    }
}
