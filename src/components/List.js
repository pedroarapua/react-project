import React, { Component } from 'react';
import {IconContext } from "react-icons";
import {FaQuestion, FaRegHeart , FaHeart} from "react-icons/fa";
import {Link} from 'react-router-dom';

import "./List.css";

export default class List extends Component {
    render() {
        const {hero} = this.props;

        return (
            <div className="list-block">
                <div className="list-block-content">
                    <div className="list-block-thumb">
                        <Link to={"/informacao/" + hero.id}>
                            <picture>
                                <source srcSet={hero.thumbnail.path + "/standard_medium." + hero.thumbnail.extension} media="(max-width: 577px)"/>
                                <img src={hero.thumbnail.path + "/standard_xlarge." + hero.thumbnail.extension} alt={hero.name} text={hero.name} />
                            </picture>
                        </Link>
                    </div>
                    <div className="list-block-info">
                        <h2>{hero.name}</h2>
                        <div className="list-block-buttons">
                            <IconContext.Provider value={{className: "btn-icons" }}>
                                <Link to={"/informacao/" + hero.id} className="btn btn-info" title="Mais Informações"><FaQuestion /></Link>
                                <span className="btn" title="Adicionar aos Favoritos"><FaRegHeart /></span>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
