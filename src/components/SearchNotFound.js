import React, { Component } from 'react';
import './SearchNotFound.css';

export default class components extends Component {
    render() {
        return(
            <div className="search-not-found-wrapper margin-40 text-center">
                <h2>Nenhum herói encontrado :(</h2>
                <p>Talvez ele tenha sido "apagado" por Thanos... Ou talvez o nome digitado na busca esteja incorreto!</p>
            </div>
        );
    }
}