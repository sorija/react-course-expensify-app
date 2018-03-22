import { createStore } from 'redux';


//'state' is current state
// state gets set to default value (in this case its 'count:0')
// const store = createStore((state = { count: 0 }, action) => {
//   if (action.type === 'INCREMENT') {
//     return {
//       count: state.count + 1
//     };
//   } else {
//     return state;
//   }
// });

// Action generators
// empty object as a default
// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',
//     //check if value was passed in:
//     //if yes, then use the value to increment
//     //if not then default to 1
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
//   });

// destructured version:
// if incrementBy exists, use its value
// otherwise incrementBy defaults to 1 (so no need for ternary anymore!)
// if no object was provided, argument defaults to empty object...
// in that case we won't have 'incrementBy' so it defaults to 1
const incrementCount = ({ incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy //same as incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

// no need for default: we force user to provide count
const setCount = ( { count } ) => ({
  type: 'SET',
  count
});

// no way to pass data in, it always sets to 0
const resetCount = () => ({
  type: 'RESET'
})

// Reducers
const countReducer = (state = { count: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count //will always be 101
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
}

const store = createStore(countReducer);

//gets called every time the state changes
const unsubscribe = store.subscribe(() => {
  //returns the current state object
  console.log(store.getState());
});

// to change the count
// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 3
// });

store.dispatch(incrementCount({ incrementBy: 5}));

// unsubscribe();


store.dispatch(resetCount());

//calling it with no arguments will make it default to 1
store.dispatch(decrementCount()); 

store.dispatch(decrementCount({ decrementBy: 10 }));

//action with required type
store.dispatch(setCount({ count: 101 }));

