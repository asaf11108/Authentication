import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';

const Routes = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/main" exact component={MainPage}/>
        </Switch>
    </BrowserRouter>
    )
};

export default Routes;