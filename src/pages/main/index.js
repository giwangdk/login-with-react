import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import unAuthredirect from '../../hocs/unAuthRedirect'

const MainPages = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
    </Switch>
)

export default unAuthredirect('/login', MainPages)