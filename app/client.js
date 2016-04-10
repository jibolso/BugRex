import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Profile from './components/Profile';
import Account from './components/Account';
import Transcripts from './components/Transcript';
import Transcript from './components/Transcript/Transcript';
import Expert from './components/Expert';
import Featured from './components/Featured';
import ExpertProfile from './components/Expert/ExpertProfile';
import Home from './components/Home';
import Login from './components/Login';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

var routes = (
	<Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
        	<Route path="expert" component={Expert}>
        		<Route path=":expertName" component={ExpertProfile} />
        	</Route>
            <Route path="transcript" component={Transcripts} >
                <Route path=":transcriptTitle" component={Transcript} />
            </Route>
            <Route path="featured" component={Featured}/>            
        	<Route path="login" component={Login}/>
            <Route path="account" component={Account} />
        	<Route path=":username" component={Profile} />

        </Route>
    </Router>
	);

ReactDOM.render(routes, document.getElementById('root'));
