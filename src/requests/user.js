import { BASE_URL } from '../constants'

const requestData = (body = {}, method = 'GET', token = null) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  return {
    method,
    body,
    mode: 'cors',
    headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers
  }
}

export const signInRequest = ({ email, password }) => {
  return fetch(`${BASE_URL}/sign_in`, requestData(
    JSON.stringify({ user: { email, password }}),
    'POST')
  )
}

export const signUpRequest = ({ email, password, firstName, lastName }) => {
  return fetch(`${BASE_URL}/sign_up`, requestData(
    JSON.stringify({ user: { email, password, first_name: firstName, last_name: lastName }}),
    'POST'
  ))
}
