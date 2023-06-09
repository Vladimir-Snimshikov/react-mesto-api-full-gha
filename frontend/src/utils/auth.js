import { config } from "./utils";
const {url} = config

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export function register(password, email) {
  return fetch(`${url}signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function login(password, email) {
  return fetch(`${url}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return checkResponse(res);
  });
}

export function auth(jwt) {
  return fetch(`${url}users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
}

