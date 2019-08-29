/* Realiza o carregamento dos componentes em rotas definidas */
import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/Main';
import FavoriteList from './pages/FavoriteList';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Information from './pages/Information';

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/busca" component={Search} />
                    <Route path="/favoritos" component={FavoriteList} />
                    <Route path="/informacao/:id" component={Information} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;