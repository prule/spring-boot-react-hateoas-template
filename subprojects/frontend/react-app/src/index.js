import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

// function index(state, action) {
//   switch (action.type) {
//     case 'INDEX_LOAD':
//       console.log('index_load', action.index);
//       state = action.index;
//       return state;
//     default:
//       return state;
//   }
// }
//
// function app(state = {}, action) {
//   return {
//     index: index(state, action)
//   }
// }
//
// function loadIndex(index) {
//   return {
//     type: 'INDEX_LOAD',
//     index: index
//   }
// }
//
// const store = createStore(app);

// Api.index().then((index) => {
//     // store.dispatch(loadIndex(index));
//   }
// );

ReactDOM.render(
    <BrowserRouter>
      <Route component={App}/>
    </BrowserRouter>

  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
