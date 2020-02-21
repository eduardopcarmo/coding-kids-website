import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'; // CSS Normalize => https://www.npmjs.com/package/normalize.css
import './index.css'; // Local Reset based on https://medium.com/@elad/normalize-css-or-css-reset-9d75175c5d1e
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
