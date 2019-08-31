import React, { Component } from 'react';
import api from '../services/api';
import {Link} from 'react-router-dom';
import Menu from '../components/Menu';
import LoadingScreen from '../components/Loading';
import './Information.css';

/* Componente com as informações do herói */
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
                                    <div  className="information-block-container">
                                        <div className="margin-20">
                                            <p className="information-block-title">Séries</p>
                                            <div className="information-block">
                                                {hero.series.items.map((serie, index) => (
                                                    <div className="information-block-item" key={index}>
                                                        {serie.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="margin-20">
                                            <p className="information-block-title">Quadrinhos</p>
                                            <div className="information-block">
                                                {hero.comics.items.map((comic, index) => (
                                                    <div className="information-block-item" key={index}>
                                                        <div>{comic.name}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <span className="btn">Adicionar aos Favoritos</span>
                                        <Link to="/busca" className="btn btn-info">Voltar para a Busca</Link>
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

/* Tela de "Herói não encontrado" */
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
        status: 200,
        isLoading: false
    };

    async componentDidMount(){
        this.setState({
            isLoading: true
        });
        const match = this.props.match;
        const response = await api.getHero(match.params.id);

        if(response.status === 200){
            this.setState({
                hero: response.data.data.results
            });
        } else {
            this.setState({
                status: response.status
            });
        }
        this.setState({
            isLoading: false
        });
    }

    render() {
        let renderBlock;

        if(this.state.isLoading){
            /* Tela de carregamento enquanto a API busca os heróis */
            renderBlock = <LoadingScreen />
        } else {
            if(this.state.status === 200){
                /* Listagem das informações do herói */
                renderBlock = <HeroInformation hero={this.state.hero}/>;
            } else {
                /* Tela quando as informações de um herói não são encontradas */
                renderBlock = <HeroNotFound />;
            }
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