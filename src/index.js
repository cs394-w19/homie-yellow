import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fire from './fire';
import BaseTemplate from './components/BaseTemplate';
import * as serviceWorker from './serviceWorker';
//import database from './data/fake_data.json';

var database = fire.database();
var taskList = [];

ReactDOM.render(
  <BaseTemplate database={database} taskList={taskList} fire={fire}/>,
   document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
