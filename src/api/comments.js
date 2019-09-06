import { get } from '../utils'

export async function getComments(resourceType, resourceId, fetch_) {
  const response = await get(
    `media/comments?resourceType=${resourceType}&resourceId=${resourceId}`,
    fetch_
  )
  return await response.json()
}