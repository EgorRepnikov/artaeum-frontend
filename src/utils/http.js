const BASE_URL = 'http://localhost:8080/'

export function get(url) {
  return fetch(BASE_URL + url, { method: 'GET' })
}

export function post(url, body) {
  return fetch(BASE_URL + url, { method: 'POST', body })
}

export function put(url, body) {
  return fetch(BASE_URL + url, { method: 'PUT', body })
}

export function del(url) {
  return fetch(BASE_URL + url, { method: 'DELETE' })
}
