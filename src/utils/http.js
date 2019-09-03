const API_URL = 'http://localhost:8080/'

const token = typeof localStorage !== 'undefined' ?
  localStorage.getItem('access_token') : undefined

export function get(url, fetch) {
  return wrap(url, { method: 'GET' }, fetch)
}

export function post(url, body, fetch) {
  return wrap(url, { method: 'POST', body: JSON.stringify(body) }, fetch)
}

export function put(url, body, fetch) {
  return wrap(url, { method: 'PUT', body: JSON.stringify(body) }, fetch)
}

export function delete_(url, fetch) {
  return wrap(url, { method: 'DELETE' }, fetch)
}

function wrap(url, options = {}, fetch_ = fetch) {
  if (token) {
    if (options.headers === undefined) {
      options.headers = {}
    }
    options.headers['Authorization'] = token
  }
  return fetch_(API_URL + url, options)
}
