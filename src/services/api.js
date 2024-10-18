import axios from 'axios';

const API_URL = 'http://be-load-1000929963.ap-southeast-2.elb.amazonaws.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
