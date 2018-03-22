import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import expenses from '../fixtures/expenses';
import ExpenseForm from '../../components/ExpenseForm';

//this test will fail on 2nd rerun because current date will be different
//so we have to mock Moment library and return moment at specific time
test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot(); // snapshot to compare with later
  // find the form & simulate an event
  // we also have to simulate 'e.preventDefault();' that we call first onSubmit
  // so we pass it to 2nd argument as an object with a single property 
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // fetch the state off from wrapper to verify that state for error isnt an empty string
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  // make sure that after error state changes, it gets rendered
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New description';
  // render expense form
  const wrapper = shallow(<ExpenseForm />);
  // change the input; we need to find only the first input
  // next set an 'e' equal to an object with target defined on it
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  // check if the description state was set correctly
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '12.1333';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    //e.target.value must exist
    target: { value }
  });
  // state should not change because amount was invalid (defaults to an empty string)
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid for submission', () => {
  // create a new spy (gives access to new assertions)
  const onSubmitSpy = jest.fn();
  // render component with the spy
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  // simulate form submission
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // make assertions
  expect(wrapper.state('error')).toBe('');
  // check if spy was called with the specific expense
  // can't call it with just .toHaveBEenLastCalledWith(expenses[0]) because that would include id...
  // and ExpenseForm's onSubmit doesnt send out an id (because expense is just being added)
  expect(onSubmitSpy).toHaveBeenLastCalledWith( {
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />); // no need to pass any data
  // find by component
  // get a specific prop (onDateChange) from the component...
  //...and call it with specific data it expects (Moment's instance)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  // check that the state was correctly set
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});