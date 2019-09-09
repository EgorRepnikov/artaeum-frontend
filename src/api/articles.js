import { get } from '../utils'
import { getUser } from './users'
import { getCategory } from './categories'

export async function getArticle(id, fetch_) {
  const response = await get(`blog/articles/${id}`, fetch_)
  return response.status === 404 ? false : await response.json()
}

export async function getArticles(params = '', { user, category }, fetch_) {
  const response = await get(`blog/articles${params}`, fetch_)
  const totalCount = response.headers.get('x-total-count')
  const articles = await response.json()
  for (const article of articles) {
    article.user = user ? user : await getUser(article.userId, fetch_)
    if (article.category) {
      article.category = category ? category : await getCategory(article.category, fetch_)
    }
  }
  return { totalCount, articles }
}
