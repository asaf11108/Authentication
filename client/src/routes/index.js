import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import MainPage from '../components/MainPage';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/main" exact component={MainPage}/>
        </Switch>
    </BrowserRouter>
);