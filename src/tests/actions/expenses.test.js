import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(async done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  await database.ref(`users/${uid}/expenses`).set(expensesData);
  done();
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    description: 'my description update'
  });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { description: 'my description update' }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', async done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This is better',
    createdAt: 1000
  };
  const res = await store.dispatch(startAddExpense(expenseData));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  const snapshot = await database
    .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
    .once('value');
  expect(snapshot.val()).toEqual(expenseData);
  done();
});

test('should add expense with defaults to database and store', async done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };
  await store.dispatch(startAddExpense({}));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  const snapshot = await database
    .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
    .once('value');
  expect(snapshot.val()).toEqual(expenseData);
  done();
});

test('should set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', async done => {
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startSetExpenses());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
  done();
});

test('should remove expenses from firebase', async done => {
  const id = '2';
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startRemoveExpense({ id }));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'REMOVE_EXPENSE',
    id
  });
  const snapshot = await database
    .ref(`users/${uid}/expenses/${id}`)
    .once('value');
  expect(snapshot.val()).toBeFalsy();
  done();
});

test('should edit expenses from firebase', async done => {
  const id = '3';
  const updates = { amount: 30 };
  const store = createMockStore(defaultAuthState);
  await store.dispatch(startEditExpense(id, updates));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });
  const snapshot = await database
    .ref(`users/${uid}/expenses/${id}/amount`)
    .once('value');
  expect(snapshot.val()).toBe(30);
  done();
});

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       createdAt: 0,
//       amount: 0
//     }
//   });
// });
