import {
  USER_SIGN_UP,
  USER_SIGN_OUT,
  USER_SIGN_IN,
  GOOGLE
} from '../constants'

export function signUp({ email, password }) {
  return {
    type: USER_SIGN_UP,
    payload: { email, password }
  }
}

export function signIn({ email, password }) {
  return {
    type: USER_SIGN_IN,
    payload: { email, password }
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
