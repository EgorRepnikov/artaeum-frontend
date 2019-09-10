import { get, post } from '../utils'

export async function getSubscriptions(params = '', fetch_) {
  const response = await get(`profile/subscriptions${params}`, fetch_)
  return await response.json()
}

export async function subscribe(profileId) {
  const response = await post('profile/subscriptions', { profileId })
  return response.status === 201
}

export async function unsubscribe(profileId) {
  const response = await fetch('profile/subscriptions', {
    method: 'DELETE',
    body: JSON.stringify({ profileId })
  })
  return response.status === 200
}
