import { get } from '../utils'

export async function getArticle(id, fetch_) {
  const response = await get(`blog/articles/${id}`, fetch_)
  return response.status === 404 ? false : await response.json()
}

export async function getArticles(params = '', fetch_) {
  const response = await get(`blog/articles${params}`, fetch_)
  return {
    totalCount: response.headers.get('x-total-count'),
    articles: await response.json()
  }
}
