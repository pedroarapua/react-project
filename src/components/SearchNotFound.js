import React, { Component } from 'react';
import './SearchNotFound.css';

export default class SearchNotFound extends Component {
    render() {
        let type;
        if(this.props.typePage === 'timeout'){
            type = (
                <div className="search-not-found-content">
                    <h2>Nenhum herói encontrado. Pode ter ocorrido uma instabilidade na conexão</h2>
                    <span class="btn" onClick={this.reload()}>Buscar novamente</span>
                </div>
            );
        } else {
            type = (
                <div className="search-not-found-content">
                    <h2>Nenhum herói encontrado :(</h2>
                    <p>Talvez ele tenha sido "apagado" por Thanos... Ou talvez o nome digitado na busca esteja incorreto!</p>
                </div>
            );
        }

        return(
            <div className="search-not-found-wrapper margin-40 text-center">
                {type}
            </div>
        );
    }
}