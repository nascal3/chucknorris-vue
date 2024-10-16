import axios from 'axios'

// Set config defaults when creating the instance
const http = axios.create({
  baseURL: 'https://api.chucknorris.io/jokes',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http