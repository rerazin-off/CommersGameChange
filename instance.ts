import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/', //url из документации нужно будет поменять
  headers: { 'content-type': 'application/json' },
});
