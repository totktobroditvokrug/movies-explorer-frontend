// const BASE_URL = 'https://auth.nomoreparties.co';
// const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://api.nekto.lukas.nomoredomains.club';
import { baseUrl } from './constants.js'

const BASE_URL = baseUrl;

const handleResponse = res => res.ok ? res.json() : Promise.reject(res);

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(handleResponse)
  }

export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
  .then(handleResponse)
};

export const login = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(handleResponse)
};
