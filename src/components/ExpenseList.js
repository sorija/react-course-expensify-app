import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


//map to iterate
//render new instance of ExpenseList component for each
//(this export is for testing)
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          //map an array of objects and return instances of ExpenseListItem
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id}{...expense}/>
          })
        )
      }
    </div>
  </div>
);

// {
//   props.options.map((option, index)=> (
//     <Option
//       key={option}
//       optionText={option}
//       count={index + 1}
//       handleDeleteOption={props.handleDeleteOption}
//     />
//   ))
// }

const mapStateToProps = (state) => {
  return {
    //access filtered, sorted array
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);

//...is pro version of: 
// export default connect((state) => {
//   return {
//     expenses: state.expenses
//   }
// })(ExpenseList);

//..which is same as :
//const ConnectedExpense list = connect()...