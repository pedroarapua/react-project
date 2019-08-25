import React, { Component } from 'react';
import ListBlock from '../components/List';
import api from '../services/api';

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
            <div className="favorite-list-wrapper">
                <h1 className="text-center">Meus Heróis Favoritos</h1>
                <div className="container">
                    <div className="flex-box">
                        {this.state.heroes.map(hero => (
                            <ListBlock key={hero.id} hero={hero} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}