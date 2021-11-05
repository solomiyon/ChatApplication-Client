import axios from "axios";
import { createBrowserHistory } from 'history';
import Auth from "./Auth";

export const BASE_URL = "https://localhost:44367/";
export const history = createBrowserHistory();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let cancel;

axios.interceptors.request.use(
  config => {
    const token = Auth.getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      new CancelToken(function executor(c) {
        cancel = c;
      })
      source.cancel();
      Auth.removeToken();
      const str = window.location.pathname
      if(str !== "/signin")
      {
        localStorage.setItem('pathName',str);
      }
      history.push("/signin");
      window.location.reload();

    }
    if(err.response?.status === 403){
      history.push("/notAuthorized");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

const get = async (url, data, paramsSerializer) => {
  const response = await axios.get(BASE_URL + url, {
    headers: {'Content-Type': 'application/json'}, 
    params: data,
    paramsSerializer: paramsSerializer
  });
  return response;
};

const post = async (url, data) => {
  const response = await axios.post(BASE_URL + url, data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": 'application/json',
    },
  });
  return response;
};

const put = async (url, data) => {
  const response = await axios.put(BASE_URL + url, data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};

const remove = async (url, data, options = {}) => {
  const response = await axios.delete(BASE_URL + url, {
    ...options,
    params: data,
  });
  return response;
};

export { get, post, put, remove };