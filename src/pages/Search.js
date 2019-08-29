import React, { Component } from 'react';
import api from '../services/api';
import ListBlock from '../components/List';
import Menu from '../components/Menu';
import Filters from '../components/Filters';
import SearchNotFound from '../components/SearchNotFound';
import LoadingScreen from '../components/Loading';
import Pagination from '../components/Pagination';

export default class Search extends Component {
    state = {
        heroes: [],
        totalResults: 0,
        offsetResults: 0,
        notFound: false,
        isLoading: false
    };

    componentDidMount(){
        this.handleContentUpdate();
    }
    
    /* Chamada da API para buscar a lista de heróis*/
    handleContentUpdate = async (filters, parameterSearch) =>{
        this.setState({
            isLoading: true
        });
        const response = await api.getHeroes(filters !== undefined ? filters : '-modified', parameterSearch !== undefined ? parameterSearch : this.props.location.search);

        console.log(response);
        if(response.data.data.count){
            this.setState({
                heroes: response.data.data.results,
                totalResults: response.data.data.total,
                offsetResults: response.data.data.offset,
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
                pageResults = <SearchNotFound typePage="search"/>;
            } else {
                /* Listagem de Heróis */
                pageResults = (
                    <div className="search-list-results flex-box">
                        {this.state.heroes.map(hero => (
                            <ListBlock key={hero.id} hero={hero} />
                        ))}
                        <Pagination updatePagination={this.handleContentUpdate} totalResults={this.state.totalResults} offsetResults={this.state.offsetResults}/>
                    </div>
                )
            }
        }

        return (
            <div className="wrapper search-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Últimos Atualizados</h1>
                    <Filters updateResults={this.handleContentUpdate}/>
                </div>
                <div className="container">
                    {pageResults}
                </div>
                <Menu updateResults={this.handleContentUpdate}/>
            </div>
        );
    }
}
