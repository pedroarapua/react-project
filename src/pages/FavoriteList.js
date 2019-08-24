import React, { Component } from 'react';
import './css/List.css';

export default class pages extends Component {
    render() {
        return(
            <div className="favorite-list-wrapper">
                <h1 className="text-center">Meus Heróis Favoritos</h1>
                <div className="flex-box">
                    <div className="container">
                        <ListBlock />
                    </div>
                </div>
            </div>
        );
    }
}


function ListBlock(props) {
    return (
        <div className="list-block">
            <div className="list-block-thumb">
                Aqui será a thumbnail
            </div>
            <div className="list-block-info">
                <h2>Nome do Herói</h2>
                <div className="list-block-description">
                    Descrição resumida do herói
                </div>
                <span className="btn margin-20">+ Mais Informações</span>
            </div>
        </div>
    );
}