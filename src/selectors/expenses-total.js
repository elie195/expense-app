const selectExpensesTotal = expenses =>
  expenses
    .map(expense => expense.amount)
    .reduce((sum, current) => sum + current, 0);

export default selectExpensesTotal;
