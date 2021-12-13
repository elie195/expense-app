import { login, logout } from '../../actions/auth';

test('should send correct login action', () => {
  const uid = 123;
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should send correct logout action', () => {
  const action = logout();
  expect(action).toEqual({ type: 'LOGOUT' });
});
