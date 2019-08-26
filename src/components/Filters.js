import React, { Component } from 'react';
import {FaFilter} from "react-icons/fa";
import './Filters.css';

export default class Filters extends Component {

    handleOpenFilters(){
        console.log('ok');
    }

    render() {
        return (
            <div className="filter-wrapper">
                <div className="filter-toggle" onClick={this.handleOpenFilters}>
                    <FaFilter /> Filtrar Por
                </div>
                <div className="filter-wrapper-content">
                    <form>
                        <div className="form-group">
                            <label>Ordernar por:</label>
                            <select className="form-input">
                                <option>Selecionar</option>
                            </select>
                        </div>
                        <button className="btn">Filtrar</button>
                    </form>
                </div>
            </div>
        );
    }
}
