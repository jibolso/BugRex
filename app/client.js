import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Profile from './components/Profile';
import Experts from './components/Experts';
import Home from './components/Home';
import Login from './components/Login';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

var routes = (
	<Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
        	<Route path="profile" component={Profile}/>
        	<Route path="experts" component={Experts}/>
        	<Route path="login" component={Login}/>
        </Route>
    </Router>
	);

ReactDOM.render(routes, document.getElementById('left'));
