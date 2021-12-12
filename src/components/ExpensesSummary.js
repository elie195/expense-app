import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const plural = expenseCount === 1 ? '' : 's';
  const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div>
      <p>
        Viewing {expenseCount} expense
        {plural} totalling {formattedTotal}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  expenseCount: selectExpenses(state.expenses, state.filters).length,
  expensesTotal: selectExpensesTotal(state.expenses)
});

export default connect(mapStateToProps)(ExpensesSummary);
