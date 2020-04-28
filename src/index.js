import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import 'antd/dist/antd.css';
import './index.css';
import AppRouter from './routes';
import store, { actions } from './state-management';
import * as serviceWorker from './serviceWorker';

const token = localStorage.getItem('token');
if (token) {
  // eslint-disable-next-line camelcase
  const { user_id } = jwt.decode(token);
  // eslint-disable-next-line camelcase
  if (user_id) {
    store.dispatch(actions.login(user_id));
  }
}
ReactDOM.render(
  <Provider store={store}>
    <AppRouter/>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
