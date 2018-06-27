import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import 'antd/dist/antd.css';
import reducers from './reducers';
import * as actionCreators from './actions';

import App from './components/App';


import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

store.dispatch(actionCreators.getInvoices());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
