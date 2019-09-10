import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {dictionaries} from './dictionaries'

ReactDOM.render(
            <div>
                <Table context={dictionaries[0]}/>
                <Table context={dictionaries[1]}/>
            </div>, 
            document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
