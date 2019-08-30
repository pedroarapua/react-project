import React, { Component } from 'react';
import {IconContext} from "react-icons";
import {Link, withRouter} from 'react-router-dom';
import {FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaAngleDoubleLeft} from "react-icons/fa";
import './Pagination.css';

class PrevButtons extends Component {
    render(){
        return(
            <IconContext.Provider value={{className: "pagination-icons" }}>
                <li>
                    <Link to="/busca?page=1" title="Voltar para a primeira página">
                        <FaAngleDoubleLeft />
                    </Link>
                </li>
                <li>
                    <Link to={"/busca?page=" + (this.props.currentPage - 1)} title="Voltar para a página anterior">
                        <FaAngleLeft />
                    </Link>
                </li>
            </IconContext.Provider>
        );
    }
}

class NextButtons extends Component {
    render(){
        return(
            <IconContext.Provider value={{className: "pagination-icons" }}>
                <li>
                    <Link to={"/busca?page=" + (this.props.currentPage + 1)} title="Ir para a próxima página">
                        <FaAngleRight />
                    </Link>
                </li>
                <li>
                    <Link to={"/busca?page=" + this.props.pages} title="Ir para a última página">
                        <FaAngleDoubleRight />
                    </Link>
                </li>
            </IconContext.Provider>
        );
    }
}

class Pagination extends Component {

    state = {
        page: '1'
    }

    handleClick = e =>{
        const paramFilters = new URLSearchParams(this.props.location.search);
        let urlParameters;

        if(paramFilters.get('page')){
            urlParameters = '?page=' + paramFilters.get('page');
        };

        this.props.updateResults(paramFilters.get('orderBy') ? paramFilters.get('orderBy') : '-modified', urlParameters);
    }

    render() {
        const offset = this.props.offsetResults + 1;
        const limit = this.props.offsetResults +  this.props.limitResults;

        /* Realiza as operações necessárias para descobrir o número de páginas necessárias */
        const restItems = this.props.totalResults % this.props.limitResults;
        let pages;
        if(restItems){
            pages = ((this.props.totalResults - restItems) / this.props.limitResults) + 1;
        }  else {
            pages = this.props.totalResults / this.props.limitResults;
        }
        
        /* Configuração da paginação, duas verificações são realizadas para controlar o número de páginas exibidas para navegação*/
        let pageLinks = [];
        const paramPage = new URLSearchParams(this.props.location.search);
        const currentPage = paramPage.get('page') ? parseInt(paramPage.get('page')) : 1;
        const totalDisplay = currentPage + 3 < pages ? currentPage + 3 : pages;
        const startPage = currentPage - 3 > 1 ? currentPage - 3 : 1;

        for(let i = startPage; i <= totalDisplay; i++){
            if(currentPage === i){
                pageLinks.push(
                    <li key={"page-" + i} className="active"><span>{i}</span></li>
                );
            } else {
                pageLinks.push(
                    <li key={"page-" + i}><Link to={"/busca?page=" + i}>{i}</Link></li>
                );
            }
        }
        
        return(
            <div className="pagination-wrapper">
                <div className="pagination-wrapper-content col">
                    <ul className="pagination-items-list">
                        {currentPage > 1 && <PrevButtons currentPage={currentPage} pages={pages}/>}
                        {pageLinks}
                        {currentPage < pages && <NextButtons currentPage={currentPage} pages={pages}/>}
                    </ul>
                </div>
                <div className="pagination-information col">
                    <span>Mostrando {offset} para {limit} de {this.props.totalResults}</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Pagination);