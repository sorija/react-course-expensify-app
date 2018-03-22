import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'; // library for generating random id

// dummy data
const demoState = {
  expenses: [{
    id: 'randomString',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  // allow users to search
  filters: {
    text: 'rent', // search 'description' and 'note' for provided text
    sortBy: 'amount', // display sorted by date or amount
    startDate: undefined,
    endDate: undefined
  }
};

// Action generators:

// ADD_EXPENSE 
const addExpense = (
  { 
    description = '', 
    note = '', amount = 0, 
    createdAt = 0 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SET_START_DATE
// undefined is default so no need to set it
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// Expenses Reducer

// variable for default state value
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action ) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // add expense to array without changing the state(original array)
      return [...state, action.expense]; //same as: return state.concat(action.expense)
    case 'REMOVE_EXPENSE':
      // remove item without changing original state
      // array 'expenses' gets destructurized to get id
      return state.filter(({ id }) => id !== action.id);
      // same as: return state.filter((expense) => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      // iterate all expenses in the array
      return state.map((expense) => {
        // check if id of the current expense matches the one we try to find
        if (expense.id === action.id) {
          //if match
          return {
            ...expense, // grab all properties from existing object...
            ...action.updates //...override properties that were passed in
          };
        } else {
          return expense; // no change
        };
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = { 
  text: '', 
  sortBy: 'date',
  startDate: undefined, 
  endDate: undefined 
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state, // because you have to return NEW state
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  };
};


//timestamps (count in milliseconds)
// timestamp 0 = January 1st 1970 (unix epoch)
// positive numbers are coming after unix epoch, negative - before that date
// 1 sec = 1000 millisecond

// Get visible expenses
// destructure 'filters' 
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  // determine if particular expense should be included 
  return expenses.filter((expense) => {
    // The startDate and endDate are undefined in the beginning
    // If they aren't a number, we can assume that those dates haven't been set yet...
    // so by default startDateMatch and endDateMatch will be true rendering all of the expenses (based on their date)
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    // check if expenses.description has the text variable string inside of it
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    // if all true then item will be kept in the 'expenses' array
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      // -1 means 'a' comes first, 1 means 'b' comes first
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy == 'amount') {
      return a.amount < b.amount ? 1 : -1; //greater amount comes first
    }
  });
};

// Store creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});


// .dispatch returns action object
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));  //startDate: 125
// store.dispatch(setStartDate()); // undefined
// store.dispatch(setEndDate(1250));  //endDate: 1250
