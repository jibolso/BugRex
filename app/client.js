import React from 'react';
import ReactDOM from 'react';
import Main from './components/Main';
import Profile from './components/Profile';
import Home from './components/Home';

import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

var routes = (
	<Router history={createBrowserHistory()}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
        	<Route path="profile" component={Profile}/>
        </Route>
    </Router>
	);

ReactDOM.render(routes, document.getElementById('root'));
