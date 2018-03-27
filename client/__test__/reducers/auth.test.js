import * as actions from '../../actions/actionCreators';
import * as types from '../../actions/actionTypes';
import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';

let action, newState, expectedState;
const payload = { username: 'demola', password: 123456 };
describe('Auth Reducers', () => {
  it('should return the initial state', () => {
    action = {};
    newState = { isLoading: false, isAuthenticated: false };
    expect(authReducer(undefined, action)).toEqual(newState);
  });
  it('should handle SIGN_IN', () => {
    action = actions.signIn(payload);
    newState = authReducer(initialState.authReducer, action);
    expectedState = { isLoading: true, isAuthenticated: false };
    expect(newState).toEqual(expectedState);
  });
  it('should handle SIGN_IN_SUCCESS', () => {
    action = {
      type: types.SIGN_IN_SUCCESS,
      response: { message: 'login successful' },
      isAuthenticated: true
    };
    newState = authReducer(initialState.authReducer, action);
    expectedState = { isLoading: false, isAuthenticated: true };
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.isLoading).toEqual(false);
    expect(newState.response).toEqual('login successful');
    expect(newState.error).toEqual(null);
  });
  it('should handle SIGN_IN_FAILURE', () => {
    action = actions.loginFailure('login failed');
    newState = authReducer(initialState.authReducer, action);
    expectedState = {
      isLoading: false,
      isAuthenticated: false,
      error: 'login failed'
    };
    expect(newState).toEqual(expectedState);
  });
  it('should handle LOG_OUT', () => {
    action = { type: types.LOG_OUT_SUCCESS, isAuthenticated: false };
    newState = authReducer(initialState.authReducer, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.isAuthenticated).toEqual(false);
  });
});