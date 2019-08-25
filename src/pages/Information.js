import React, { Component } from 'react';
import api from '../services/api';
import Menu from '../components/Menu';

export default class Information extends Component {

    state = {
        hero: []
    };

    async componentDidMount(){
        const match = this.props.match;
        const response = await api.getHero(match.params.id);
        this.setState({hero: response.data.data.results});
    }

    render() {
        return (
            <div className="information-wrapper">
                {this.state.hero.map(hero => (
                    <div className="information-wrapper-content" key={hero.id}>
                        <div className="filter-bar">
                            <h1 className="title">Informações sobre o Herói</h1>
                        </div>
                        <div className="container">
                            <div className="flex-box">
                                <div className="information-image">
                                    <picture>
                                        <img src={hero.thumbnail.path + '/portrait_uncanny.' + hero.thumbnail.extension} alt={hero.name} text={hero.name} />
                                    </picture>
                                </div>
                                <div className="information-description">
                                    <h2 className="title">{hero.name}</h2>
                                    <p>{hero.description ? hero.description : 'No momento não há uma descrição para este herói'}</p>
                                    <div class="buttons">
                                        <span className="btn">Voltar para a Busca</span>
                                        <span className="btn">Adicionar aos Favoritos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <Menu />
            </div>
        );
    }
}
