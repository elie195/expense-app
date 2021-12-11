export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const sortByAmount = () => ({
  type: 'SORT_AMOUNT_FILTER'
});

export const sortByDate = () => ({
  type: 'SORT_DATE_FILTER'
});

export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});
