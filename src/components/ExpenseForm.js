import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

//goal: use local component's state to track the changes to all the inputs
//only when form is submitted, we sent it up to redux and do something with the data
//BUT we DONT DISPATCH the action in this component-we want it to be reusable!
//so we just passed the data out of ExpenseForm (by calling a prop that gets passed in from the parent
export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //.amount is a number in cents, we want a string with decimal places
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      //.moment() gets current time
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      description: props.expense ? props.expense.description : '',
      calendarFocused: false,
      error: '',
      note: props.expense ? props.expense.note : ''
    };
  };
  onDescriptionChange = (e) => {
    //e.target needs to be pulled first!
    //this.setState(() => ({ description: e.target.value })); would not work without .persist
    const description = e.target.value;
    this.setState(() => ({ description })); //description: description
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    //!amount allows user to clear the input
    //match a price up to 2 decimal points
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    //if statement prevents user from being able to clear the date input
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault(); //prevent full page refresh
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount' }));
    } else {
      //clear the error
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        //amount is a string, so we need to format it
        //parseFloat keeps decimal place and turns into real number base 10
        //multiply by 100 because we work with cents
        amount: parseFloat(this.state.amount, 10) * 100,
        //createdAt is a Moment stamp->have to format it to miliseconds
        //.valueOf is a method provided by Moment
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        {/*conditionally render the error*/}
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input  
            type="text"
            placeholder="Description"
            autoFocus //automatically puts cursor/focus on the form
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text" //'text' instead of 'number' to enforece currency specific restrictions
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false } //all dates available
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
};