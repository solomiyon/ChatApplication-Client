import axios from "axios";
import { createBrowserHistory } from 'history';
import { BASE_URL } from "./Const";
import { interceptors } from "./Interceptor";

export const history = createBrowserHistory();
  
const get = async (url, data, paramsSerializer) => {
  return await axios.get(BASE_URL + url, {
    headers: {'Content-Type': 'application/json'}, 
    params: data,
    paramsSerializer: paramsSerializer
  });
};

const post = async (url, data) => {
  return await axios.post(BASE_URL + url, data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": 'application/json',
    },
  });
};

const put = async (url, data) => {
  return await axios.put(BASE_URL + url, data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  });
};

const remove = async (url, data, options = {}) => {
  return await axios.delete(BASE_URL + url, {
    ...options,
    params: data,
  });
};

export { get, post, put, remove };