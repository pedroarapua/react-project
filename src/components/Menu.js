import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {IconContext } from "react-icons";
import {FaSearch, FaHeart, FaHome, FaChevronUp} from "react-icons/fa";
import "./css/Menu.css";

export default class Menu extends Component {
    render() {
        return (
            <nav className="menu-wrapper">
                <ul className="flex-list">
                    <IconContext.Provider value={{className: "menu-icons" }}>
                        <li><FaHome /></li>
                        <li><FaSearch /></li>
                        <li> <Link to="/favoritos"><FaHeart /></Link></li>
                        <li><FaChevronUp /></li>
                    </IconContext.Provider>
                </ul>
            </nav>
        );
    }
}
