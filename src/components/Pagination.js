import React, { Component } from 'react';
import {IconContext} from "react-icons";
import {Link, withRouter} from 'react-router-dom';
import {FaAngleLeft, FaAngleRight, FaAngleDoubleRight, FaAngleDoubleLeft} from "react-icons/fa";
import './Pagination.css';

/* Botões para voltar a página */
class PrevButtons extends Component {
    render(){
        return(
            <IconContext.Provider value={{className: "pagination-icons" }}>
                <li>
                    <Link to="/busca?page=1" title="Voltar para a primeira página" onClick={(page) => this.props.clickPage(1)}>
                        <FaAngleDoubleLeft />
                    </Link>
                </li>
                <li>
                    <Link to={"/busca?page=" + (this.props.currentPage - 1)} title="Voltar para a página anterior" onClick={(page) => this.props.clickPage(this.props.currentPage - 1)}>
                        <FaAngleLeft />
                    </Link>
                </li>
            </IconContext.Provider>
        );
    }
}

/* Botões para avançar a página */
class NextButtons extends Component {
    render(){
        return(
            <IconContext.Provider value={{className: "pagination-icons" }}>
                <li>
                    <Link to={"/busca?page=" + (this.props.currentPage + 1)} title="Ir para a próxima página" onClick={(page) => this.props.clickPage(this.props.currentPage + 1)}>
                        <FaAngleRight />
                    </Link>
                </li>
                <li>
                    <Link to={"/busca?page=" + this.props.pages} title="Ir para a última página" onClick={(page) => this.props.clickPage(this.props.pages)}>
                        <FaAngleDoubleRight />
                    </Link>
                </li>
            </IconContext.Provider>
        );
    }
}

/* Renderização dos componentes pertecentes a paginação */
class Pagination extends Component {

    state = {
        page: '1'
    }

    /* Recarregamento da página com os novos items buscados */
    handleClick = (page) =>{
        const paramFilters = new URLSearchParams(this.props.location.search);
        let urlParameters;

        if(page){
            urlParameters = '?page=' + page;
        } else {
            urlParameters = '?page=' + 1;
        }

        this.props.updateResults(paramFilters.get('orderBy') ? paramFilters.get('orderBy') : '-modified', urlParameters);
    }

    render() {
        const prop = this.props;
        const offset = prop.offsetResults + 1;
        let limit;

        if((prop.offsetResults + prop.limitResults) > prop.totalResults){
            limit = prop.totalResults;
        } else if(prop.totalResults > prop.limitResults){
            limit = prop.offsetResults + prop.limitResults;
        } else {
            limit = prop.totalResults;
        }

        /* Realiza as operações necessárias para descobrir o número de páginas necessárias */
        const restItems = prop.totalResults % prop.limitResults;
        let pages;
        if(restItems){
            pages = ((prop.totalResults - restItems) / prop.limitResults) + 1;
        }  else {
            pages = prop.totalResults / prop.limitResults;
        }
        
        /* Configuração da paginação, duas verificações são realizadas para controlar o número de páginas exibidas para navegação*/
        let pageLinks = [];
        const paramPage = new URLSearchParams(prop.location.search);
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
                    <li key={"page-" + i}><Link to={"/busca?page=" + i} onClick={(page) => this.handleClick(i)}>{i}</Link></li>
                );
            }
        }
        
        return(
            <div className="pagination-wrapper">
                <div className="pagination-wrapper-content col">
                    <ul className="pagination-items-list">
                        {currentPage > 1 && <PrevButtons currentPage={currentPage} pages={pages} clickPage={this.handleClick}/>}
                        {pageLinks}
                        {currentPage < pages && <NextButtons currentPage={currentPage} pages={pages} clickPage={this.handleClick}/>}
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