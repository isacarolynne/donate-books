import axios from 'axios';

const api = axios.create({
  baseURL:  "https://api-books-donations.herokuapp.com"
});

export default api;