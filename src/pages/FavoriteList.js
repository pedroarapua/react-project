import React, { Component } from 'react';
import api from '../services/api';
import ListBlock from '../components/List';
import Menu from '../components/Menu';
import SearchNotFound from '../components/SearchNotFound';
import LoadingScreen from '../components/Loading';

class FavoriteList extends Component {
    state = {
        heroes: [],
        notFound: false,
        isLoading: false
    };

    async componentDidMount(){
        this.setState({
            isLoading: true
        });
        const response = await api.getFavoriteHeroes();
        if(response.data.data.count){
            this.setState({
                heroes: response.data.data.results,
                notFound: false
            });
        } else {
            this.setState({
                notFound: true
            });
        }
        this.setState({
            isLoading: false
        });
    }

    render() {
        let pageResults;

        if(this.state.isLoading){
            /* Tela de carregamento enquanto a API busca os heróis */
            pageResults = <LoadingScreen />
        } else {
            if(this.state.notFound){
                /* Tela de "Não Encontrado" nenhum resultado foi retornado */
                pageResults = <SearchNotFound typePage="favorites"/>;
            } else {
                /* Listagem de Heróis Favoritos */
                pageResults = this.state.heroes.map(hero => (
                    <ListBlock key={hero.id} hero={hero} />
                ))
            }
        }

        return(
            <div className="wrapper favorite-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Meus Heróis Favoritos</h1>
                </div>
                <div className="container">
                    <div className="flex-box">
                        {pageResults}
                    </div>
                </div>
                <Menu />
            </div>
        );
    }
}

export default FavoriteList;