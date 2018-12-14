import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// componentes
import Login from './components/Login'

import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(<Router>
       <div>
       <Route path="/" exact component={App} />
       <Route path="/login" component={Login} />

       </div> 

    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
