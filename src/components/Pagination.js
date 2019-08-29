import React, { Component } from 'react';
import './Pagination.css'
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default class Pagination extends Component {
    state = {
        pages: 1
    }
    render() {
        const pages = this.state.pages;
        
        return(
            <div className="pagination-wrapper">
                <div className="pagination-wrapper-content">
                    <ul className="pagination-items-list">
                        <li>
                            <FaChevronLeft />
                            <FaChevronLeft />
                        </li>
                        <li>
                            <FaChevronLeft />
                        </li>
                        <li>
                            <span>1</span>
                        </li>
                        <li>
                            <FaChevronRight />
                        </li>
                        <li>
                            <FaChevronRight />
                            <FaChevronRight />
                        </li>
                    </ul>
                </div>
                <div className="pagination-information">
                    <span>Mostrando {this.props.offsetResults} de {this.props.totalResults}</span>
                </div>
            </div>
        );
    }
}
