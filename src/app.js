import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses'; //named export
import { setTextFilter } from './actions/filters'; //named export
import getVisibleExpenses from './selectors/expenses'; //default export
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './firebase/firebase';

// get access to store.dispatch/subscribe, etc
const store = configureStore(); 

const jsx = (
  <Provider store={store}> 
  {/*all components inside Provider have access to the store!*/}
    <AppRouter />
  </Provider>
);

//render loading message while fetching data
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById('app'));
});
