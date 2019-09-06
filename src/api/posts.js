import { get } from '../utils'

export async function getPosts(params = '', fetch_) {
  const response = await get(`media/posts${params}`, fetch_)
  return {
    totalCount: response.headers.get('x-total-count'),
    posts: await response.json()
  }
}
