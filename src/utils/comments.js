import { get } from './http'

export async function loadComments(resourceType, resourceId, fetch) {
  const commentsResponse = await get(
    `media/comments?resourceType=${resourceType}&resourceId=${resourceId}`,
    fetch
  )
  const comments = await commentsResponse.json()

  for (const comment of comments) {
    const userResponse = await get(`uaa/users/${comment.userId}`, fetch)
    comment.user = await userResponse.json()
  }

  return comments
}