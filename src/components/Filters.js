import React, { Component } from 'react';
import {IconContext} from "react-icons";
import {FaFilter, FaTimes} from "react-icons/fa";
import './Filters.css';


class FiltersWrapper extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="filter-container">
                    <span className="close-filters" title="Fechar Filtros" onClick={this.props.updateOpenFilters}>
                        <FaTimes />
                    </span>
                    <form>
                        <div className="form-group">
                            <label>Ordernar por:</label>
                            <select className="form-input">
                                <option>Selecionar</option>
                                <option value="name">Nome: A - Z</option>
                                <option value="-name">Nome: Z - A</option>
                                <option value="modified">Modificação: Mais Recentes</option>
                                <option value="-modified">Modificação: Mais Antigos</option>
                            </select>
                        </div>
                        <div className="form-group">
                            Filtros
                        </div>
                        <button className="btn margin-20">Filtrar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default class Filters extends Component {

    state = {
        openFilters: false
    }

    handleOpenFilters = e => {
        this.setState({
            openFilters: !this.state.openFilters
        })
    }

    render() {
        const openFilters = this.state.openFilters ? 'filter-wrapper-content open-filters' : 'filter-wrapper-content closed-filters'

        return (
            <div className="filter-wrapper">
                <div className="filter-toggle" onClick={this.handleOpenFilters}>
                    <IconContext.Provider value={{className: "filter-icon" }}>
                        <FaFilter /> Filtrar Por
                    </IconContext.Provider>
                </div>
                <FiltersWrapper className={openFilters} updateOpenFilters={this.handleOpenFilters}/>
            </div>
        );
    }
}
