import { get } from '../utils'

export async function getSubscriptions(params = '', fetch_) {
  const response = await get(`profile/subscriptions${params}`, fetch_)
  return await response.json()
}
