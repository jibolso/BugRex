import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Profile from './components/Profile';
import Home from './components/Home';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

var routes = (
	<Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
        	<Route path="profile" component={Profile}/>
        </Route>
    </Router>
	);

ReactDOM.render(routes, document.getElementById('root'));
