import axios from 'axios';
import store from '../../redux/store';
import { logout } from '../../redux';

const instance = axios.create({
  baseURL: "https://burger-builder-263b1.firebaseio.com/"
});

const CancelToken = instance.CancelToken;

instance.interceptors.request.use(req => {
  return req;
}, err => {
  throw err;
});

instance.interceptors.response.use((res) => {
  return res;
}, err => {
  if(err.response && err.response.data.error === 'Auth token is expired') {
    setTimeout(() => store.dispatch(logout()), 1000);
  }
  throw err;
});

export default instance;

export { CancelToken };