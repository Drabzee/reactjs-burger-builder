import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_ERROR
} from './authTypes';

const intitialState = {
  user: {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    mobile: localStorage.getItem('mobile'),
    address: localStorage.getItem('address'),
    idToken: localStorage.getItem('idToken'),
    expiresIn: localStorage.getItem('expiresIn'),
    localId: localStorage.getItem('localId')
  },
  loading: false,
  error: null
}

const authReducer = (state = intitialState, action) => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }
    case LOGOUT:
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('mobile');
      localStorage.removeItem('address');
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('localId');
      return {
        user: {
          name: null,
          email: null,
          mobile: null,
          address: null,
          idToken: null,
          expiresIn: null,
          localId: null
        },
        loading: false,
        error: null
      };
    default: return state;
  }
}

export default authReducer;