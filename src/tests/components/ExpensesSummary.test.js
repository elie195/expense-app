import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

// let expenseCount, expensesTotal;

// beforeEach(() => {
//   expenseCount = jest.fn();
//   expensesTotal = jest.fn();
//   wrapper = shallow(<ExpensesSummary expenseCount={expenseCount} expensesTotal={expensesTotal} />);
// });

test('should render ExpensesSummary with no expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={0} expensesTotal={0} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={3} expensesTotal={114195} />
  );
  expect(wrapper).toMatchSnapshot();
});
