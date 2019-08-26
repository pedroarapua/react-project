import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {IconContext} from "react-icons";
import {FaSearch, FaHeart, FaHome} from "react-icons/fa";
import "./Menu.css";

class Menu extends Component {

    state = {
        path: this.props.location.pathname
    }

    handleOpenSearch() {
        console.log('open');
    }

    render() {
        return (
            <nav className="menu-wrapper">
                <ul className="flex-list">
                    <IconContext.Provider value={{className: "menu-icons" }}>
                        <li className={this.state.path === '/busca' ? 'active' : ''}><Link to="/busca" title="Voltar para página inicial"><FaHome /></Link></li>
                        <li><span onClick={this.handleOpenSearch} title="Buscar"><FaSearch /></span></li>
                        <li className={this.state.path === '/favoritos' ? 'active' : ''}><Link to="/favoritos" title="Meus Favoritos"><FaHeart /></Link></li>
                    </IconContext.Provider>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Menu);