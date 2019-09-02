const API_URL = 'http://localhost:8080/'

const token = typeof localStorage !== 'undefined' ?
  localStorage.getItem('access-token') : undefined

export function get(url) {
  return wrap(url, { method: 'GET' })
}

export function post(url, body) {
  return wrap(url, { method: 'POST', body })
}

export function put(url, body) {
  return wrap(url, { method: 'PUT', body })
}

export function delete_(url) {
  return wrap(url, { method: 'DELETE' })
}

function wrap(url, options = {}) {
  if (token) {
    options.headers['Authorization'] = token
  }
  return fetch(API_URL + url, options)
}
