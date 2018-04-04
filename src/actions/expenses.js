import uuid from 'uuid';
import database from '../firebase/firebase';

// Action generators

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  // can return a function because of redux-thunk
  return (dispatch) => {
    // destructure (same as destructuring in function's arg)
    const {
      description = '', 
      note = '', amount = 0, 
      createdAt = 0 
    } = expenseData;
    // save data
    const expense = { description, note, amount, createdAt };
    // we return a promise, so then we can chain it in the test case
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};
