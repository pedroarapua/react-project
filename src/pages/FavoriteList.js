import React, { Component } from 'react';
import api from '../services/api';
import ListBlock from '../components/List';
import Menu from '../components/Menu';
import Filters from '../components/Filters';

export default class FavoriteList extends Component {
    state = {
        heroes: []
    };

    async componentDidMount(){
        const response = await api.getHeroes();
        this.setState({heroes: response.data.data.results});
    }

    render() {
        return(
            <div className="wrapper favorite-list-wrapper">
                <div className="filter-bar">
                    <h1 className="title">Meus Heróis Favoritos</h1>
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