import moment from 'moment';

// fixture is a test data

export default [{
  id: '1',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 109500,
  //we are comparing isSameOrAfter/Before by DAYS
  createdAt: moment(0).subtract(4, 'days').valueOf() //.valueOf cuz it needs to be a number
}, {
  id: '3',
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}];