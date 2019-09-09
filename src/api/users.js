import { get, post } from '../utils'

export async function registerUser(user) {
  const response = await post('register', user)
  return response.status === 201
}

export async function getUser(loginOrId, fetch_) {
  const response = await get(`uaa/users/${loginOrId}`, fetch_)
  return response.status === 404 ? false : await response.json()
}

export async function saveUser(user) {
  const response = await post('uaa/account', user)
  return response.status === 200
}

export async function changePassword(password) {
  const response = await fetch('uaa/account/change-password', {
    method: 'POST',
    body: password
  })
  return response.status === 200
}
