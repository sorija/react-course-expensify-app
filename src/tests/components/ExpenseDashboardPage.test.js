import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardpage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage correctly', () => {
  const wrapper = shallow(<ExpenseDashboardpage />);
  expect(wrapper).toMatchSnapshot();
});