import React, { Component } from 'react';
import logo from '../images/logo.svg'
import './Login.css';

export default class Login extends Component {
    state ={
        username: '',
    };

    handleSubmit = e => {
        e.preventDefault();

        const {username} = this.state;
        
        if(!username.length) return;

        localStorage.setItem('@MarvelHeroesList:username', username);
        
        this.props.history.push('/busca');
    }

    handleInputChange = e => {
        this.setState({
            username: e.target.value
        });
    }

    render() {
        return (
            <div className="flex-box login-wrapper">
                <div className="container-fluid">
                    <div className="content-block">
                        <img src={logo} alt="Marvel: Listagem de Heróis" width={255} height={102} />
                        <h1 className="login-title">Listagem de Heróis</h1>
                    </div>
                    <div className="content-block margin-40">
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                value={this.state.username} 
                                placeholder="Nome de usuário" 
                                className="form-input" 
                                type="text" 
                                onChange={this.handleInputChange}
                            />
                            <button type="submit" className="btn margin-20">Entrar</button>
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
}
