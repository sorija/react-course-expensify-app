import moment from 'moment';
import { create } from 'domain';
// Get visible expenses

// destructure 'filters' 
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  // determine if particular expense should be included 
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    //dont filter based on this value (return true) if no start/end date provided
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true ;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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

export default getVisibleExpenses;
