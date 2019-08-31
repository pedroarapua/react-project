import React, { Component } from 'react';
import {IconContext} from "react-icons";
import {FaFilter, FaTimes} from "react-icons/fa";
import {withRouter} from 'react-router-dom';
import './Filters.css';


class FiltersWrapper extends Component {
    state = {
        order: '-modified'
    }

    handleFilter = () =>{
        const {order} = this.state;
        if(!order.length) return;
        
        this.props.history.push({
            pathname: '/busca',
            search: '?orderBy=' + this.state.order
        });

        this.props.updateResultsFilters(order, '');
        this.props.updateOpenFilters();
    }

    handleOrderValue = e =>{
        this.setState({
            order: e.target.value
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="filter-container">
                    <span className="close-filters" title="Fechar Filtros" onClick={this.props.updateOpenFilters}>
                        <FaTimes />
                    </span>
                    <div className="filter-fields">
                        <div className="form-group">
                            <label>Ordernar por:</label>
                            <select className="form-input" defaultValue="-modified" onChange={this.handleOrderValue}>
                                <option value="name">Nome: A - Z</option>
                                <option value="-name">Nome: Z - A</option>
                                <option value="-modified">Modificação: Mais Recentes</option>
                                <option value="modified">Modificação: Mais Antigos</option>
                            </select>
                        </div>
                        <button className="btn margin-20" onClick={this.handleFilter}>Filtrar</button>
                    </div>
                </div>
            </div>
        );
    }
}

class Filters extends Component {

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
                <FiltersWrapper className={openFilters} updateOpenFilters={this.handleOpenFilters} history={this.props.history} updateResultsFilters={this.props.updateResults}/>
            </div>
        );
    }
}
export default withRouter(Filters);