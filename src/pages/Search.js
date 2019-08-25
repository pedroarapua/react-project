import React, { Component } from 'react';
import ListBlock from '../components/List';
import api from '../services/api';
import Menu from '../components/Menu';

export default class Search extends Component {
    state = {
        heroes: []
    };

    async componentDidMount(){
        const response = await api.getHeroes('-modified');
        this.setState({heroes: response.data.data.results});
    }

    render() {
        return (
            <div className="search-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Últimos Atualizados</h1>
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
