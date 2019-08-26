import React, { Component } from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';
import Menu from '../components/Menu';
import './Information.css';

class HeroInformation extends Component {
    render() {
        return (
            <div className="wrapper information-wrapper-content">
                {this.props.hero.map(hero => (
                    <div className="information-item" key={hero.id}>
                        <div className="filter-bar">
                            <h1 className="title">Informações sobre o Herói</h1>
                        </div>
                        <div className="container">
                            <div className="flex-box">
                                <div className="col-25 information-image">
                                    <picture>
                                        <source srcSet={hero.thumbnail.path + "/standard_large." + hero.thumbnail.extension} media="(max-width: 767px)"/>
                                        <img src={hero.thumbnail.path + '/portrait_uncanny.' + hero.thumbnail.extension} alt={hero.name} text={hero.name} />
                                    </picture>
                                </div>
                                <div className="col-75 information-description">
                                    <h2 className="title">{hero.name}</h2>
                                    <p className="margin-20">{hero.description ? hero.description : 'No momento não há uma descrição para este herói'}</p>
                                    <div className="buttons">
                                        <span className="btn">Adicionar aos Favoritos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

class HeroNotFound extends Component {
    render() {
        return (
            <div className="information-wrapper-content text-center information-not-found">
                <div className="container">
                    <h2 className="title">Herói não encontrado</h2>
                    <div className="buttons">
                        <Link to="/busca" className="btn btn-info">Voltar para a Busca</Link>
                    </div>
                </div>
            </div>
        );
    }
}

class Information extends Component {

    state = {
        hero: [],
        status: 200
    };

    async componentDidMount(){
        const match = this.props.match;
        const response = await api.getHero(match.params.id);

        console.log(response);

        if(response.code === 'ECONNABORTED'){
            console.log('timeout');
        } else if(response.status === 200){
            this.setState({
                hero: response.data.data.results
            });
        } else {
            this.setState({
                status: response.status
            });
        } 
    }

    render() {
        let renderBlock;

        if(this.state.status === 200){
            renderBlock = <HeroInformation hero={this.state.hero}/>;
        } else {
            renderBlock = <HeroNotFound />;
        }

        return (
            <div className="information-wrapper">
                {renderBlock}
                <Menu />
            </div>
        );
    }
}

export default Information;