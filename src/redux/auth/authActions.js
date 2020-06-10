import axiosAuth from '../../utils/axios/auth';
import axiosDB from '../../utils/axios/db';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_ERROR
} from './authTypes';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData
  }
}

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

const storeUser = (user, dispatch) => {
  dispatch(loginSuccess({
    ...user
  }));
  localStorage.setItem('name', user.name);
  localStorage.setItem('mobile', user.mobile);
  localStorage.setItem('address', user.address);
  localStorage.setItem('email', user.email);
  localStorage.setItem('idToken', user.idToken);
  localStorage.setItem('localId', user.localId);
  localStorage.setItem('expiresIn', user.expiresIn);
}

export const login = (credentials, url) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const loginRes = await axiosAuth.post('/accounts:signInWithPassword?key=AIzaSyBR2tEdzwXl3uH-c_-DZZWxsW5ftwNyaE0', {
        ...credentials,
        returnSecureToken: true
      });
      const userRes = await axiosDB.get(`/users/${loginRes.data.localId}.json?auth=${loginRes.data.idToken}`);
      storeUser({
        name: userRes.data.name,
        mobile: userRes.data.mobile,
        address: userRes.data.address,
        email: loginRes.data.email,
        idToken: loginRes.data.idToken,
        localId: loginRes.data.localId,
        expiresIn: loginRes.data.expiresIn
      }, dispatch);
    } catch(err) {
      dispatch(loginFailure(err.response ? (err.response.data.error.message ? err.response.data.error.message : err.response.data.error) : err.message));
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const resetError = () => {
  return {
    type: RESET_ERROR
  }
}

export const register = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const res = await axiosAuth.post('/accounts:signUp?key=AIzaSyBR2tEdzwXl3uH-c_-DZZWxsW5ftwNyaE0', {
        ...credentials,
        returnSecureToken: true
      });
      await axiosDB.put(`/users/${res.data.localId}.json?auth=${res.data.idToken}`, {
        name: credentials.name,
        mobile: credentials.mobile,
        address: credentials.address
      });
      storeUser({
        name: credentials.name,
        mobile: credentials.mobile,
        address: credentials.address,
        email: res.data.email,
        idToken: res.data.idToken,
        localId: res.data.localId,
        expiresIn: res.data.expiresIn
      }, dispatch);
    } catch(err) {
      dispatch(loginFailure(err.response ? (err.response.data.error.message ? err.response.data.error.message : err.response.data.error) : err.message));
    }
  }
}