import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {IconContext} from "react-icons";
import {FaSearch, FaHeart, FaHome, FaTimes} from "react-icons/fa";
import "./Menu.css";

/* Componente da barra de busca, que será exibida ao clicar no botão "Buscar" do menu principal */
class SearchBar extends Component {
    state ={
        search: ''
    };
    
    handleSearch = e => {
        const {search} = this.state;
        if(!search.length) return;
        this.props.history.push({
            pathname: '/busca',
            search: '?name=' + search
        });
        this.props.updateSearchResults('?name=' + search);
        this.props.updateOpen();
        this.setState({
            search: ''
        });
    }

    handleSearchInputChange = e => {
        this.setState({
            search: e.target.value
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="search-bar-container">
                    <span className="close-search-bar" title="Fechar Busca" onClick={this.props.updateOpen}>
                        <FaTimes />
                    </span>
                    <h2 className="title">Quem você está procurando?</h2>
                    <div className="input-group">
                        <input 
                            className="form-input"
                            value={this.state.search} 
                            type="text" 
                            placeholder="Ex: Spider-Man, Hulk, Iron Man etc..."
                            onChange={this.handleSearchInputChange}
                        />
                        <span onClick={this.handleSearch} title="Pesquisar" className="btn"><FaSearch /></span>
                    </div>
                </div>
            </div>
        );
    }
}

/* Componente do Menu principal */
class Menu extends Component {

    state = {
        path: this.props.location.pathname,
        open: false
    }

    handleOpenSearch = e => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const openStatus = this.state.open ? 'search-bar-wrapper open-search' : 'search-bar-wrapper closed-search'
        
        return (
            <div className="menu-container">
                <nav className="menu-wrapper">
                    <ul className="flex-list">
                        <IconContext.Provider value={{className: "menu-icons" }}>
                            <li className={this.state.path === '/busca' && !this.state.open ? 'active' : ''}><Link to="/busca" title="Voltar para página inicial"><FaHome /></Link></li>
                            <li className={this.state.open ? 'active' : ''}><span onClick={this.handleOpenSearch} title="Buscar"><FaSearch /></span></li>
                            <li className={this.state.path === '/favoritos' && !this.state.open ? 'active' : ''}><Link to="/favoritos" title="Meus Favoritos"><FaHeart /></Link></li>
                        </IconContext.Provider>
                    </ul>
                </nav>
                <SearchBar className={openStatus} updateOpen={this.handleOpenSearch} history={this.props.history} updateSearchResults={this.props.updateResults}/>
            </div>
        );
    }
}

export default withRouter(Menu);