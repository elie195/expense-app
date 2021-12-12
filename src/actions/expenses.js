import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return async dispatch => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    const ref = await database.ref('expenses').push(expense);
    dispatch(
      addExpense({
        id: ref.key,
        ...expense
      })
    );
    return ref;
  };
};

export const removeExpense = ({ id }) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return async dispatch => {
    const expenses = [];
    const snapshot = await database.ref('expenses').once('value');
    snapshot.forEach(childSnapshot => {
      expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    dispatch(setExpenses(expenses));
    return snapshot;
  };
};

export const startRemoveExpense = ({ id } = {}) => {
  return async dispatch => {
    if (!id) {
      return;
    }
    const res = await database.ref(`expenses/${id}`).remove();
    dispatch(removeExpense({ id }));
    return res;
  };
};
