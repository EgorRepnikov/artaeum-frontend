import { post, get } from '../utils'

export async function login(username, password, session) {
  const loginResponse = await post('login', { username, password })
  if (loginResponse.status === 200) {
    const userResponse = await get('uaa/account')
    if (userResponse.status === 200) {
      const { access_token, refresh_token } = await loginResponse.json()
      const user = await userResponse.json()
      session.set({ access_token, refresh_token, user })
      localStorage.set('access_token', access_token)
      return true
    }
  }
  return false
}

export function logout(session) {
  session.set({})
  localStorage.removeItem('access_token')
}

export async function activateAccount(key, fetch_) {
  const response = await get(`uaa/activate?key=${key}`, fetch_)
  return response.status === 200
}
