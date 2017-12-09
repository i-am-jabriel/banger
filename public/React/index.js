import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import store from '../Redux';

ReactDOM.render(
  <Main store={store}/>,
  document.getElementById('main')
);