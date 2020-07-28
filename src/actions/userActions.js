import {
  USER_SIGN_UP,
  USER_SIGN_OUT,
  USER_SIGN_IN,
  GOOGLE,
  START,
  FAIL,
  SUCCESS,
  USER_FETCH
} from "../constants"
import {
  signInRequest,
  signUpRequest,
  googleSignInRequest,
  fetchProfileRequest
} from "../requests/user"
import { checkResponseForError } from "../requests/base"
import { googleSignIn as googleSignInApi } from "../services/googleApi"

export function signUp(payload) {
  return dispatch => {
    dispatch({ type: USER_SIGN_UP + START })

    signUpRequest(payload)
      .then(checkResponseForError)
      .then(data => dispatch({ type: USER_SIGN_UP + SUCCESS, payload: data }))
      .catch(error => error.json().then(data => dispatch({ type: USER_SIGN_UP + FAIL, payload: data })))
  }
}

export function signIn({ email, password }) {
  return dispatch => {
    dispatch({ type: USER_SIGN_IN + START })

    signInRequest({ email, password })
      .then(checkResponseForError)
      .then(data => dispatch({ type: USER_SIGN_IN + SUCCESS, payload: data }))
      .catch(error => error.json().then(data => dispatch({ type: USER_SIGN_IN + FAIL, payload: data })))
  }
}

export function googleSignIn() {
  return dispatch => {
    dispatch({ type: USER_SIGN_IN + GOOGLE + START })

    googleSignInApi()
      .then(googleUser => {
        const idToken = googleUser.getAuthResponse().id_token

        googleSignInRequest({ token: idToken, provider: "google" })
          .then(checkResponseForError)
          .then(data => dispatch({ type: USER_SIGN_IN + GOOGLE + SUCCESS, payload: data }))
          .catch(error => error.json().then(data => dispatch({ type: USER_SIGN_IN + GOOGLE + FAIL, payload: data })))
      })
    }
}

export function signOut() {
  return { type: USER_SIGN_OUT }
}

export function fetchProfile(token) {
  return dispatch => {
    dispatch({ type: USER_FETCH + START })

    fetchProfileRequest(token)
      .then(checkResponseForError)
      .then(data => dispatch({ type: USER_FETCH + SUCCESS, payload: data }))
      .catch(error => error.json().then(data => dispatch({ type: USER_FETCH + FAIL, payload: data })))
  }
}
