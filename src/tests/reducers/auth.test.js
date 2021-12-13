import authReducer from '../../reducers/auth';

test('should login', () => {
  const uid = 123;
  const state = authReducer({}, { type: 'LOGIN', uid });
  expect(state).toEqual({ uid });
});

test('should logout', () => {
  const uid = 234;
  const state = authReducer({ uid }, { type: 'LOGOUT' });
  expect(state).toEqual({});
});
