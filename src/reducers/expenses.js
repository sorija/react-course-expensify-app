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
    case 'SET_EXPENSES':
      return action.expenses;
    default:
      return state;
  }
};

export default expensesReducer;
