import { get, post } from '../utils'

export async function registerUser(user) {
  const response = await post('register', user)
  return response.status === 201
}

export async function getUser(loginOrId, fetch_) {
  const response = await get(`uaa/users/${loginOrId}`, fetch_)
  return response.status === 404 ? false : await response.json()
}
