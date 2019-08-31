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
        isLoading: false,
        timeout: false
    };

    componentDidMount(){
        this.contentUpdate();
    }

    setLoad = () =>{
        this.setState({
            loadingItems: true
        });
    }

    contentReload = () =>{
        this.setState({
            timeout: false
        });
    }
    
    /* Chamada da API para buscar a lista de heróis*/
    contentUpdate = async (order, parameterSearch) =>{
        this.setState({
            timeout: false,
            isLoading: true
        });
        const paramOrder = new URLSearchParams(this.props.location.search);
        let orderType;

        if(order){
            orderType = order;
        } else if(paramOrder && paramOrder.get('orderBy')){
            orderType = paramOrder.get('orderBy');
        } else {
            orderType = '';
        }

        const response = await api.getHeroes(orderType && orderType !== undefined ? orderType : '-modified', parameterSearch !== undefined ? parameterSearch : this.props.location.search);

        if(response === 'ECONNABORTED'){
            this.setState({
                timeout: true
            });
        } else if(response && response.data.data.count){
            this.setState({
                heroes: response.data.data.results,
                totalResults: response.data.data.total,
                offsetResults: response.data.data.offset,
                limitResults: response.data.data.limit,
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
            if(this.state.timeout){
                /* Tela quando atinge o limite de tempo de carregamento da api */
                pageResults = <SearchNotFound typePage="timeout" reload={this.contentReload} />;
            } else if(this.state.notFound){
                /* Tela de "Não Encontrado" nenhum resultado foi retornado */
                pageResults = <SearchNotFound typePage="search"/>;
            } else {
                /* Listagem de Heróis */
                pageResults = (
                    <div className="search-list-results flex-box">
                        {this.state.heroes.map(hero => (
                            <ListBlock key={hero.id} hero={hero} />
                        ))}
                        <Pagination updateResults={this.contentUpdate} totalResults={this.state.totalResults} offsetResults={this.state.offsetResults} limitResults={this.state.limitResults}/>
                    </div>
                );
            }
        }

        return (
            <div className="wrapper search-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Buscando Heróis</h1>
                    <Filters updateResults={this.contentUpdate}/>
                </div>
                <div className="container">
                    {pageResults}
                </div>
                <Menu updateResults={this.contentUpdate}/>
            </div>
        );
    }
}
