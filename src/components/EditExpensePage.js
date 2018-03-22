import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

// Refactored code with class based component
// allows to pull out in-line functions to methods...
//... so we don't have to redefine them every time the component gets rendered

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    //'expense' are the updates
    // props.dispatch(editExpense(props.expense.id, expense));
    this.props.editExpense(this.props.expense.id, expense)
    this.props.history.push('/');
  };
  onRemove = () => {
    // props.dispatch(removeExpense({ id: props.expense.id }));
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onSubmit}
      />
      <button 
      onClick={this.onRemove}
      >
      Remove
      </button>
      </div>
    );
  }
};

//need to connect cuz we want to give the component the current expense object

//we are searching expenses array (that lives in 'state') for an expense that id matches props.match.params.id
//router renders the hoc, hoc passes the props throught and allows to add new ones
const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  // define props that will be able to call dispatch
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

//=========================================//
//PREVIOUS CODE
// import React from 'react';
// import { connect } from 'react-redux';
// import ExpenseForm from './ExpenseForm';
// import { editExpense, removeExpense } from '../actions/expenses';

// const EditExpensePage = (props) => {
//   return (
//     <div>
//       <ExpenseForm
//         expense={props.expense}
//         onSubmit={(expense) => {
//           props.dispatch(editExpense(props.expense.id, expense));
//           props.history.push('/');
//         }}
//       />
//       <button 
//       onClick={() => {
//         props.dispatch(removeExpense({ id: props.expense.id }));
//         props.history.push('/');
//       }}
//     >
//     Remove
//     </button>
//     </div>
//   );
// };

// const mapStateToProps = (state, props) => {
//   return {
//     expense: state.expenses.find((expense) => expense.id === props.match.params.id)
//   };
// };

// export default connect(mapStateToProps)(EditExpensePage);
