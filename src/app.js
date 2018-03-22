import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses'; //named export
import { setTextFilter } from './actions/filters'; //named export
import getVisibleExpenses from './selectors/expenses'; //default export
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

// get access to store.dispatch/subscribe, etc
const store = configureStore(); 

store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}> 
  {/*all components inside Provider have access to the store!*/}
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
