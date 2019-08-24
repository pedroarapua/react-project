import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import Login from './pages/Login';
import FavoriteList from './pages/FavoriteList';
import Search from './pages/Search';
import Information from './pages/Information';
import NotFound from './pages/NotFound';

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/favoritos" component={FavoriteList} />
                    <Route path="/busca" component={Search} />
                    <Route path="/informacao" component={Information} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;