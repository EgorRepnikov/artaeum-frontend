import { post } from '../utils'

export async function initReset(mail) {
  const response = await fetch('uaa/account/reset-password/init', {
    method: 'POST',
    body: mail
  })
  return response.status === 200
}

export async function finishReset(resetData) {
  const response = await post('uaa/account/reset-password/finish', resetData)
  return response.status === 200
}
