import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_AMOUNT_FILTER' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_DATE_FILTER' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
  const action = { type: 'SET_TEXT_FILTER', text: 'my filter text' };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('my filter text');
});

test('should set startDate filter', () => {
  const action = {
    type: 'SET_START_DATE',
    startDate: moment().startOf('month').add(4, 'days')
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment().startOf('month').add(4, 'days'));
});

test('should set endDate filter', () => {
  const action = {
    type: 'SET_END_DATE',
    endDate: moment().endOf('month').subtract(4, 'days')
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment().endOf('month').subtract(4, 'days'));
});
