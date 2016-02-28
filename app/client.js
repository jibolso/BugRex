import React from 'react';
import ReactDOM from 'react';

export default class MainApp extends React.Component {
	render(){
		return (<div>Hello same code</div>);
	}
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
