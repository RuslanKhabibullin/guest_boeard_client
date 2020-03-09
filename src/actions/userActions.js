import {
  USER_SIGN_UP,
  USER_SIGN_OUT,
  USER_SIGN_IN
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

export function signOut() {
  return { type: USER_SIGN_OUT }
}
