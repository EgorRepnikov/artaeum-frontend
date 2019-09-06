import { get } from '../utils'

export async function getCategory(id, fetch_) {
  const response = await get(`blog/categories/${id}`, fetch_)
  return response.status === 404 ? false : await response.json()
}

export async function getCategories(params = '', fetch_) {
  const response = await get(`blog/categories${params}`, fetch_)
  return await response.json()
}
