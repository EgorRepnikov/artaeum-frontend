import { post } from '../utils'

export async function initReset(mail) {
  const response = await fetch('uaa/account/reset-password/init', {
    method: 'POST',
    body: mail
  })
  return response.status === 200
}

export async function finishReset(user) {
  const response = await post('uaa/account/reset-password/finish', user)
  return response.status === 200
}
