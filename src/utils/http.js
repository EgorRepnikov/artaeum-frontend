const API_URL = 'http://localhost:8080/'

const token = typeof localStorage !== 'undefined' ?
  localStorage.getItem('access_token') : undefined

export function get(url) {
  return wrap(url, { method: 'GET' })
}

export function post(url, body) {
  return wrap(url, { method: 'POST', body: JSON.stringify(body) })
}

export function put(url, body) {
  return wrap(url, { method: 'PUT', body: JSON.stringify(body) })
}

export function delete_(url) {
  return wrap(url, { method: 'DELETE' })
}

function wrap(url, options = {}) {
  if (token) {
    if (options.headers === undefined) {
      options.headers = {}
    }
    options.headers['Authorization'] = token
  }
  return fetch(API_URL + url, options)
}
