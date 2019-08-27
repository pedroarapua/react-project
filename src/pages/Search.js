import React, { Component } from 'react';
import api from '../services/api';
import ListBlock from '../components/List';
import Menu from '../components/Menu';
import Filters from '../components/Filters';

export default class Search extends Component {
    state = {
        heroes: []
    };

    async componentDidMount(){
        const response = await api.getHeroes('-modified', this.props.location.search);
        this.setState({heroes: response.data.data.results});
    }

    render() {
        return (
            <div className="wrapper search-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Últimos Atualizados</h1>
                    <Filters />
                </div>
                <div className="container">
                    <div className="flex-box">
                        {this.state.heroes.map(hero => (
                            <ListBlock key={hero.id} hero={hero} />
                        ))}
                    </div>
                </div>
                <Menu />
            </div>
        );
    }
}
