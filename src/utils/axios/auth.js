import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

const CancelToken = instance.CancelToken;

instance.interceptors.request.use(req => {
  return req;
}, err => {
  throw err;
});

instance.interceptors.response.use(res => {
  return res;
}, err => {
  throw err;
});

export default instance;

export { CancelToken };