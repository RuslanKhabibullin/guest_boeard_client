import { BASE_URL } from '../constants'
import { requestData } from './base'

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

export const googleSignInRequest = ({ token, provider }) => {
  return fetch(`${BASE_URL}/sign_in/oauth`, requestData(
    JSON.stringify({ token, provider }),
    'POST'
  ))
}

export const fetchProfileRequest = (token) => {
  return fetch(`${BASE_URL}/users/me`, requestData({}, 'GET', token))
}
