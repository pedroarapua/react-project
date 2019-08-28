import React, { Component } from 'react';
import api from '../services/api';
import ListBlock from '../components/List';
import Menu from '../components/Menu';
import Filters from '../components/Filters';
import SearchNotFound from '../components/SearchNotFound';

export default class Search extends Component {
    state = {
        heroes: [],
        notFound: false
    };

    componentDidMount(){
        this.handleContentUpdate();
    }

    handleContentUpdate = async parameterSearch =>{
        const response = await api.getHeroes('-modified', parameterSearch !== undefined ? parameterSearch : this.props.location.search);
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
    }

    render() {
        let pageResults;

        if(this.state.notFound){
            pageResults = <SearchNotFound typePage="search"/>;
        } else {
            pageResults = this.state.heroes.map(hero => (
                <ListBlock key={hero.id} hero={hero} />
            ))
        }

        return (
            <div className="wrapper search-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Últimos Atualizados</h1>
                    <Filters />
                </div>
                <div className="container">
                    <div className="flex-box">
                        {pageResults}
                    </div>
                </div>
                <Menu updateResults={this.handleContentUpdate}/>
            </div>
        );
    }
}
