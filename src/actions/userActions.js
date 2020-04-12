import {
  USER_SIGN_UP,
  USER_SIGN_OUT,
  USER_SIGN_IN,
  GOOGLE,
  START,
  FAIL,
  SUCCESS
} from '../constants'
import {
  signInRequest,
  signUpRequest
} from '../requests/user'

export function signUp(payload) {
  return dispatch => {
    dispatch({ type: USER_SIGN_UP + START })

    signUpRequest(payload)
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: USER_SIGN_UP + SUCCESS, payload: json }))
        } else {
          response.json().then(json => dispatch({ type: USER_SIGN_UP + FAIL, payload: json }))
        }
      })
      .catch(error => dispatch({ type: USER_SIGN_UP + FAIL, payload: error }))
  }
}

export function signIn({ email, password }) {
  return dispatch => {
    dispatch({ type: USER_SIGN_IN + START })

    signInRequest({ email, password })
      .then(response => {
        if (response.ok) {
          response.json().then(json => dispatch({ type: USER_SIGN_IN + SUCCESS, payload: json }))
        } else {
          response.json().then(json => dispatch({ type: USER_SIGN_IN + FAIL, payload: json }))
        }
      })
      .catch(error => dispatch({ type: USER_SIGN_IN + FAIL, payload: error }))
  }
}

export function googleSignIn(token) {
  return {
    type: USER_SIGN_IN + GOOGLE,
    payload: { token }
  }
}

export function signOut() {
  return { type: USER_SIGN_OUT }
}
