import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';
import CreatePage from './components/Create/CreatePage';

const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/main" exact component={MainPage}/>
            <Route path="/create" exact component={CreatePage}/>
        </Switch>
    </BrowserRouter>
    )
};

export default Routes;