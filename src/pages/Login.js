import React, { Component } from 'react';
import logo from '../logo.svg'
import './css/Login.css';

export default class pages extends Component {
  render() {
    return (
        <div className="flex-box login-wrapper">
            <div className="container-fluid">
                <div className="content-block">
                    <img src={logo} alt="Marvel: Listagem de Heróis" width="255" height="102" />
                    <h1 class="login-title">Listagem de Heróis</h1>
                </div>
                <div className="content-block margin-40">
                    <form>
                        <input placeholder="Nome de usuário" className="form-input" type="text" />
                        <button type="submit" className="btn margin-20">Entrar</button>
                    </form>
                </div>
            </div>
        </div> 
    );
  }
}
