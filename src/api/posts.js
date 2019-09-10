import { get, delete_ } from '../utils'

export async function getPost(id, fetch_) {
  const response = await get(`media/posts/${id}`, fetch_)
  return response.status === 404 ? false : await response.json()
}

export async function getPosts(params = '', fetch_) {
  const response = await get(`media/posts${params}`, fetch_)
  return {
    totalCount: response.headers.get('x-total-count'),
    posts: await response.json()
  }
}

export async function deletePost(id) {
  const response = await delete_(`media/posts/${id}`)
  return response.status === 200
}
